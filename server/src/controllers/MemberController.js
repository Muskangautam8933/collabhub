/**
 * User Controller
 * Handles all user-related operations
 */

import * as memberRepo from "../repos/ProjectMemberRepo.js";
import asyncHandler from "../utils/asyncHandler.js";

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
  const member = await memberRepo.softDeleteById(
    req.params.memberId,
    req.user.userId,
  );
  return res.json(member);
});
