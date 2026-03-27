import { Server } from "socket.io";
import { SocketAuthGuard } from "../middleware/authMiddleware.js";
import config from "../config/env.js";
import { handleConnection } from "./handleConnection.js";

/**
 * 
 * Websocket Gateway
 * --------------------
 * 
 * Socket.io Configuration and Event Handlers
 * Handles real-time communication with authentication
 */
export default function createSocketManager(server) {
  /**
   * Socket.io Configuration
   * -----------------------
   *
   * @description
   * - io is a Socket.io server instance.
   * - which is a global connection between the server and the all clients.
   * - Can broadcast to everyone / rooms / specific sockets
   */
  const io = new Server(server, {
    cors: {
      origin: [config.SOCKET_IO_ORIGIN, config.CLIENT_ORIGIN],
      methods: ["GET", "POST"],
      credentials: true,
    },
  });

  /**
   * Auth middleware
   *
   * - token check
   * - attach socket.data = { userId, deviceId, email }
   */
  io.use(SocketAuthGuard);

  /**
   * Handle Socket Connection
   */
  io.on("connection", handleConnection);

  /**
   * Public API
   * ----------
   * @description
   * - Get Socket.io instance
   *
   * @returns Socket.io instance
   */
  function getIO() {
    return io;
  }

  /**
   * Public API
   * ----------
   * @description
   * - Broadcast to all users
   * - Broadcast to specific room
   * - Broadcast to specific user
   */
  function broadcast(event, data) {
    io.emit(event, data);
  }

  /**
   * Public API
   * ----------
   * @description
   * - Broadcast to specific room
   * - Broadcast to specific user
   * */
  function broadcastToRoom(roomId, event, data) {
    io.to(roomId).emit(event, data);
  }

  /**
   * Public API
   * ----------
   * @description
   * - Broadcast to specific user
   * */
  function emitToUser(userId, event, data) {
    io.sockets.sockets.forEach((socket) => {
      if (socket.userId === userId) socket.emit(event, data);
    });
  }

  return {
    io,
    getIO,
    broadcast,
    broadcastToRoom,
    emitToUser,
  };
}
