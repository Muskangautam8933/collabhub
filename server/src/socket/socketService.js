import { SOCKET_EVENTS } from "../common/constants.js";
import { socketManager } from "../server.js";
import logger from "../utils/logger.js";

// userId → Set of socketIds (supports multi-tabs)
const activeUsers = new Map();

/**
 * Add online user to activeUsers Map
 * ----------------------------------
 * @description Add online user to activeUsers Map `in-memory`
 */
export function addActiveUser({ userId, deviceId, browserInfo, socketId }) {
  let userEntry = activeUsers.get(userId);

  // First time user comes online
  if (!userEntry) {
    const sockets = new Set([socketId]);

    const devices = new Map();
    devices.set(deviceId, {
      sockets,
      info: browserInfo,
      lastSeen: new Date(),
    });

    activeUsers.set(userId, { devices });
    return;
  }

  const devices = userEntry.devices;

  // New device
  if (!devices.has(deviceId)) {
    const sockets = new Set([socketId]);

    devices.set(deviceId, {
      sockets,
      info: browserInfo,
      lastSeen: new Date(),
    });

    return;
  }

  // Existing device
  const device = devices.get(deviceId);
  device.sockets.add(socketId);
  device.lastSeen = new Date();
}

/**
 * Remove online user from activeUsers Map
 * ---------------------------------------
 * @description Cleans up socket → device → user
 */
export function removeActiveUser(socket) {
  const { userId, deviceId } = socket.data;

  if (!userId || !deviceId) return;

  const user = activeUsers.get(userId);
  if (!user) return;

  const device = user.devices.get(deviceId);
  if (!device) return;

  // Remove socket (tab)
  device.sockets.delete(socket.id);

  // If no tabs left on this device → remove device
  if (device.sockets.size === 0) {
    user.devices.delete(deviceId);
  }

  // If no devices left → user is fully offline
  if (user.devices.size === 0) {
    activeUsers.delete(userId);
    return;
  }

  // OPTIONAL: device-level update
  device.lastSeen = new Date();
}

/**
 * Broadcast online users to Everyone
 * -----------------------
 */
export function brodcastActiveUsers() {
  const activeUsers = getActiveUsersDTO();

  socketManager.getIO().emit(SOCKET_EVENTS.ONLINE_USERS, activeUsers);
  logger.info(`EMIT : ${SOCKET_EVENTS.ONLINE_USERS}`);
}

export function getActiveUsers() {
  return activeUsers;
}

/*************************************************************************
 ************************* PRIVATE ***************************************
 *************************************************************************/
function getActiveUsersDTO() {
  return Array.from(activeUsers.entries()).map(([userId, user]) => ({
    userId,
    devices: user.devices.size,
    lastSeen: Math.max(
      ...Array.from(user.devices.values()).map((d) => d.lastSeen.getTime()),
    ),
  }));
}
