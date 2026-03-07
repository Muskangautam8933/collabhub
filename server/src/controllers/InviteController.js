import * as inviteRepo from "../repos/inviteRepo.js";
import * as tokenService from "../utils/token.service.js";
import * as projectMemberRepo from "../repos/ProjectMemberRepo.js";
import { sendInviteEmail } from "../utils/email.service.js";
import { PROJECT_ROLE } from "../common/constants.js";
import asyncHandler from "../utils/asyncHandler.js";
import { withTransaction } from "../utils/withTransaction.js";

/**
 * Create Invite with email
 */
export const create = asyncHandler(async (req, res) => {
  const inviteCode = tokenService.generateInviteToken({
    sender: req.user.userId,
    email: req.body.email,
    role: req.body.role || PROJECT_ROLE.READ,
    project: req.params.projectId,
  });

  const invite = await inviteRepo.create({
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
export const accept = asyncHandler(async (req, res) => {
  const code = req.query.code;

  const payload = tokenService.verifyInviteToken(code);

  const isValidRecipientEmail = req.user.email === payload.email;

  if (!isValidRecipientEmail) throw new Error("Invalid recipient email");

  const invite = await inviteRepo.getByEmail(payload.email);

  const newMember = null;

  withTransaction(async (session) => {
    newMember = await projectMemberRepo.create(
      {
        project: payload.project,
        invite: invite._id,
        user: req.user.userId,
        role: payload.role,
      },
      { session },
    );

    await inviteRepo.updateAcceptanceByEmail(
      payload.email,
      {
        receiver: req.user.userId,
      },
      { session },
    );
  });

  if (!newMember) throw new Error("Failed to create project member");

  res.status(200).json(newMember);
});

/**
 * Delete invite
 */
