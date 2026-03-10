/**
 * Authentication Middleware
 * Verifies JWT tokens and Google OAuth
 */
import * as tokenService from "../utils/token.service.js";
import * as projectMemberRepo from "../repos/ProjectMemberRepo.js";
import projectRepo from "../repos/ProjectRepo.js";
import { PROJECT_ROLE } from "../common/constants.js";
import asyncHandler from "../utils/asyncHandler.js";

/**
 * Middleware to verify JWT token from Authorization header or cookies
 */
export const verifyToken = (req, res, next) => {
  try {
    let token = req.headers.authorization?.split(" ")[1];

    if (!token) {
      token = req.cookies?.token;
    }

    if (!token) {
      return res.status(401).json({ message: "No token provided" });
    }

    const decoded = tokenService.verifyToken(token);

    req.user = decoded;

    next();
  } catch (error) {
    res.status(401).json({ message: error.message });
  }
};

/**
 * Middleware to check if user is authenticated
 */
export const isAuthenticated = (req, res, next) => {
  if (!req.user) {
    return res.status(401).json({ message: "Not authenticated" });
  }
  next();
};

/**
 * Middleware to verify token for Socket.io
 */
export const verifySocketToken = (token) => {
  try {
    return tokenService.verifyToken(token);
  } catch (error) {
    return null;
  }
};

export const addUserRole = asyncHandler(async (req, res, next) => {
  const projectId = req.params.projectId || req.params.id;
  const userId = req.user.userId;

  const project = await projectRepo.findById(projectId);

  if (!project) throw new Error("Project not found");

  const isOwner = project.owner.toString() === userId;

  if (isOwner) {
    req.user.role = PROJECT_ROLE.OWNER;
    return next();
  }

  const member = await projectMemberRepo.getByUserAndProject(userId, projectId);

  if (member) {
    req.user.role = member.role;
    return next();
  }

  req.user.role = PROJECT_ROLE.OTHERS;
  return next();
});

export const projectMemberGaurd = asyncHandler((req, res, next) => {
  if (req.user.role === PROJECT_ROLE.OTHERS)
    throw new Error("Unauthorized Only Project Member Allowed");
  next();
});

export const ownerGaurd = asyncHandler((req, res, next) => {
  if (req.user.role !== PROJECT_ROLE.OWNER)
    throw new Error(
      `Unauthorized Only Project Owner Allowed not ${req.user.role}`,
    );
  next();
});

export const adminGaurd = asyncHandler((req, res, next) => {
  if (
    req.user.role !== PROJECT_ROLE.OWNER &&
    req.user.role !== PROJECT_ROLE.ADMIN
  )
    throw new Error(
      `Unauthorized Only Project Owner or Admin Allowed not ${req.user.role}`,
    );
  next();
});
