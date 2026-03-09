export const SOCKET_EVENTS = {
  NOTIFICATION: "ws::notification",

  MESSAGE: "ws::message",
  MESSAGE_SEND: "ws::message_send",
  MESSAGE_DELIVERED: "ws::message_delivered",
  MESSAGE_READ: "ws::message_read",

  JOIN_CHAT: "ws::join_chat",
  LEAVE_CHAT: "ws::leave_chat",

  ONLINE_USERS: "ws::online_users",
};

export const PROJECT_ROLE = {
  OWNER: "owner",
  ADMIN: "admin",
  WRITE: "write",
  READ: "read",
  OTHERS: "others",
};

export const INVITE_STATUS = {
  PENDING: "pending",
  ACCEPTED: "accepted",
};
