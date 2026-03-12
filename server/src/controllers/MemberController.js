/**
 * User Controller
 * Handles all user-related operations
 */

import * as memberRepo from "../repos/ProjectMemberRepo.js";
import * as inviteRepo from "../repos/InviteRepo.js";
import asyncHandler from "../utils/asyncHandler.js";
import { withTransaction } from "../utils/withTransaction.js";

export const getAllProjectMembers = asyncHandler(async (req, res) => {
  const members = await memberRepo.getAllProjectMembers(req.params.projectId);
  res.json(members);
});

export const updateById = asyncHandler(async (req, res) => {
  const member = await memberRepo.updateMemberRole(
    req.params.projectId,
    req.params.memberId,
    req.query.role,
  );
  return res.json(member);
});

export const deleteById = asyncHandler(async (req, res) => {
  const deletor = req.user.userId;

  await withTransaction(async (session) => {
    const member = await memberRepo.getById(req.params.memberId, { session });

    if (!member) throw new Error("Member not found");

    console.log(JSON.stringify(member, null, 2));

    await memberRepo.softDeleteById(member._id, deletor, { session });

    await inviteRepo.softDeleteById(member?.invite, deletor, { session });
  });

  res.json({ success: true });
});
