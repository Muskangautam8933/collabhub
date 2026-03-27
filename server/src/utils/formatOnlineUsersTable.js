export function formatOnlineUsersTable(onlineUsers) {
  const rows = [];

  for (const [userId, user] of onlineUsers) {
    for (const [deviceId, device] of user.devices) {
      const color = getUserColor(userId);

      rows.push({
        userId,
        deviceId,
        sockets: device.sockets.size,
        lastSeen: device.lastSeen.toLocaleTimeString(),
        browser: device.info?.browser || "unknown",

        // 👇 important for coloring
        color,
      });
    }
  }

  return rows;
}

const COLORS = ["red", "green", "yellow", "blue", "magenta", "cyan", "white"];

const userColorMap = new Map();
let colorIndex = 0;

function getUserColor(userId) {
  if (!userColorMap.has(userId)) {
    const color = COLORS[colorIndex % COLORS.length];
    userColorMap.set(userId, color);
    colorIndex++;
  }

  return userColorMap.get(userId);
}

export function colorize(text, color) {
  const COLORS = {
    red: "\x1b[31m",
    green: "\x1b[32m",
    yellow: "\x1b[33m",
    blue: "\x1b[34m",
    magenta: "\x1b[35m",
    cyan: "\x1b[36m",
    white: "\x1b[37m",
  };

  const reset = "\x1b[0m";

  return `${COLORS[color] || ""}${text}${reset}`;
}
