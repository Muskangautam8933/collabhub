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
