/**
 * Logger Utility
 * Provides centralized logging with file output and monitoring
 */

import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import pinoLogger from "./logger.pino.js";
import { printTable } from "console-table-printer";
import { colorize } from "./formatOnlineUsersTable.js";

// ESM replacement for __dirname
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Logs directory
const logsDir = path.join(__dirname, "../../logs");

// Ensure logs directory exists
if (!fs.existsSync(logsDir)) {
  fs.mkdirSync(logsDir, { recursive: true });
}

const errorLogFile = path.join(logsDir, "error.log");
const infoLogFile = path.join(logsDir, "info.log");
const accessLogFile = path.join(logsDir, "access.log");

/**
 * Format timestamp
 */
function getTimestamp() {
  return new Date().toLocaleString("en-Us");
}

/**
 * Write to log file
 */
function writeToFile(filePath, message) {
  const timestamp = getTimestamp();
  const logMessage = `[${timestamp}] ${message}\n`;

  fs.appendFile(filePath, logMessage, (err) => {
    if (err) console.error("Error writing to log file:", err);
  });
}

/**
 * Error logging
 */
function error(message, err = null) {
  if (err) {
    pinoLogger.error({ err }, message);
  } else {
    pinoLogger.error(message);
  }
}

/**
 * Info logging
 */

function info(message, data = null) {
  if (data) {
    pinoLogger.info({ data }, message);
  } else {
    pinoLogger.info(message);
  }
}

/**
 * Warning logging
 */
function warn(message, data = null) {
  if (data) {
    pinoLogger.warn({ data }, message);
  } else {
    pinoLogger.warn(message);
  }
}

/**
 * Debug logging (dev only)
 */
function debug(message, data = null) {
  if (process.env.NODE_ENV === "development") {
    pinoLogger.debug({ data }, message);
  }
}

function table(title, data) {
  const timestamp = getTimestamp();

  console.log(`\n\x1b[36m[${timestamp}] TABLE: ${title}\x1b[0m`);

  if (!data || data.length === 0) {
    console.log("No data to display");
    return;
  }

  printTable(data, {
    columns: [
      {
        name: "userId",
        alignment: "left",
        format: (val, row) => colorize(val, row.color),
      },
      {
        name: "deviceId",
        alignment: "left",
        format: (val, row) => colorize(val, row.color),
      },
      {
        name: "sockets",
        alignment: "center",
        format: (val, row) => colorize(val, row.color),
      },
      {
        name: "lastSeen",
        format: (val, row) => colorize(val, row.color),
      },
      {
        name: "browser",
        format: (val, row) => colorize(val, row.color),
      },
      {
        name: "color",
        format: (val, row) => colorize(val, row.color),
      },
    ],
  });

  writeToFile(infoLogFile, title);
}

/**
 * HTTP request logging
 */
function logRequest(method, url, status, responseTime) {
  const timestamp = getTimestamp();
  const logMessage = `${method} ${url} - Status: ${status} - ${responseTime}ms`;

  console.log(`\x1b[32m[${timestamp}] REQUEST: ${logMessage}\x1b[0m`);
  writeToFile(accessLogFile, logMessage);
}

/**
 * User activity logging
 */
function logActivity(userId, accountId, action, details = null) {
  const fullMessage = details
    ? `User: ${userId}, Account: ${accountId}, Action: ${action}, Details: ${JSON.stringify(details)}`
    : `User: ${userId}, Account: ${accountId}, Action: ${action}`;

  info(`Activity: ${fullMessage}`);
}

/**
 * Database logging
 */
function logDatabase(operation, collection, duration) {
  debug(`DB ${operation} on ${collection} - ${duration}ms`);
}

/**
 * Auth logging
 */
function logAuth(action, email, success, message = null) {
  const status = success ? "SUCCESS" : "FAILED";
  const fullMessage = `Auth ${action} for ${email} - ${status}${message ? ` - ${message}` : ""}`;

  success ? info(fullMessage) : warn(fullMessage);
}

/**
 * Log stats
 */
function getLogStats() {
  const stats = {};

  try {
    if (fs.existsSync(errorLogFile))
      stats.errorLogSize = fs.statSync(errorLogFile).size;

    if (fs.existsSync(infoLogFile))
      stats.infoLogSize = fs.statSync(infoLogFile).size;

    if (fs.existsSync(accessLogFile))
      stats.accessLogSize = fs.statSync(accessLogFile).size;
  } catch (err) {
    error("Error getting log stats", err);
  }

  return stats;
}

/**
 * Clear old logs
 */
function clearOldLogs(days = 7) {
  const now = Date.now();
  const maxAge = days * 24 * 60 * 60 * 1000;

  [errorLogFile, infoLogFile, accessLogFile].forEach((file) => {
    try {
      if (fs.existsSync(file)) {
        const stats = fs.statSync(file);
        if (now - stats.mtimeMs > maxAge) {
          fs.unlinkSync(file);
          info(`Cleared old log file: ${file}`);
        }
      }
    } catch (err) {
      error("Error clearing old logs", err);
    }
  });
}

/**
 * Export singleton logger object
 */
export default {
  error,
  info,
  warn,
  debug,
  table,
  logRequest,
  logActivity,
  logDatabase,
  logAuth,
  getLogStats,
  clearOldLogs,
};
