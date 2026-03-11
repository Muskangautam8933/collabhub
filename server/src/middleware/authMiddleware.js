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
export const AuthGuard = asyncHandler((req, res, next) => {
  let token = req.headers.authorization?.split(" ")[1];

  if (!token) {
    token = req.cookies?.token;
  }

  if (!token) {
    throw new Error("No token provided");
  }

  const decoded = tokenService.verifyToken(token);

  req.user = decoded;

  next();
});

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

export const memberGaurd = asyncHandler(async (req, res, next) => {
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

  throw new Error("Unauthorized Only Project Member Allowed");
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

export const writeGaurd = asyncHandler((req, res, next) => {
  if (
    req.user.role !== PROJECT_ROLE.OWNER &&
    req.user.role !== PROJECT_ROLE.ADMIN &&
    req.user.role !== PROJECT_ROLE.WRITE
  )
    throw new Error(
      `Unauthorized Only Project Owner, Admin or Write Allowed not ${req.user.role}`,
    );
  next();
});
