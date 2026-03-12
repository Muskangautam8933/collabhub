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
  const email = req.query.email;
  const role = req.query.role;

  if (email === req.user.email) throw new Error("You can't invite yourself");

  const inviteCode = tokenService.generateInviteToken({
    sender: req.user.userId,
    email,
    role: role ?? PROJECT_ROLE.READ,
    project: req.params.projectId,
  });

  const invite = await inviteRepo.create({
    sender: req.user.userId,
    email,
    role: role ?? PROJECT_ROLE.READ,
    project: req.params.projectId,
    code: inviteCode,
  });

  // Async send email
  sendInviteEmail(email, inviteCode, req.params.projectId);

  return res.status(201).json(invite);
});

export const getById = asyncHandler(async (req, res) => {
  const invite = await inviteRepo.getById(req.params.inviteId);
  return res.json(invite);
});

export const getByEmail = asyncHandler(async (req, res, next) => {
  const email = req.query.email;

  if (!email) return next();

  const invite = await inviteRepo.getByEmail(email);

  return res.json(invite);
});

/**
 * Get all project invites
 */
export const getByProject = asyncHandler(async (req, res) => {
  const projectId = req.params.projectId;

  const invites = await inviteRepo.getByProject(projectId);

  return res.json(invites);
});

/**
 * Accept invite
 */
export const accept = asyncHandler(async (req, res) => {
  const code = req.query.code;

  const payload = tokenService.verifyInviteToken(code);

  const isValidRecipientEmail = req.user.email === payload.email;

  if (!isValidRecipientEmail) throw new Error("Invalid recipient email");

  const invites = await inviteRepo.getByEmail(payload.email);

  if (!invites.length) throw new Error("Invite not found");
  
  console.log("Invite found:", invites, payload.project, payload.role);

  let newMember = null;

  await withTransaction(async (session) => {
    newMember = await projectMemberRepo.create(
      {
        project: payload.project,
        invite: invites[0]._id,
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

  res.status(200).json(newMember);
});

/**
 * Delete invite
 */
export const deleteById = asyncHandler(async (req, res) => {
  await inviteRepo.softDeleteById(req.params.id, req.user.userId);
  return res.json({ message: "Invite deleted successfully" });
});
