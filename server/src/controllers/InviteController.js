import * as inviteRepo from "../repos/inviteRepo.js";
import * as tokenService from "../utils/token.service.js";
import { sendInviteEmail } from "../utils/email.service.js";
import { PROJECT_ROLE } from "../common/constants.js";
import asyncHandler from "../utils/asyncHandler.js";
import { logger } from "../server.js";

/**
 * Create Invite with email
 */
export const create = asyncHandler((req, res) => {
  const inviteCode = tokenService.generateInviteToken({
    sender: req.user.userId,
    email: req.body.email,
    role: req.body.role || PROJECT_ROLE.READ,
    project: req.params.projectId,
  });

  const invite = inviteRepo.create({
    sender: req.user.userId,
    email: req.body.email,
    role: req.body.role || PROJECT_ROLE.READ,
    project: req.params.projectId,
    code: inviteCode,
  });

  // Async send email
  sendInviteEmail(req.body.email, inviteCode, req.params.projectId);

  return res.status(201).json(invite);
});

/**
 * Get all project invites
 */
export const getByProject = () => {};

/**
 * Accept invite
 */
export const accept = asyncHandler((req, res) => {
  const projectId = req.params.projectId;
  const code = req.params.code;

  logger.debug("code : ", tokenService.decodeInviteToken(code));

  res.status(200).end();
});
/**
 * Delete invite
 */
