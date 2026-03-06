/**
 * Repository
 * Handles all database operations
 * Based on ER Diagram Schema
 */

import { INVITE_STATUS } from "../common/constants.js";
import model from "../models/ProjectMemberSchema.js";
import { ObjectId } from "../utils/ObjectId.js";

/************************************************************************
 **************************** CREATE ************************************
 ************************************************************************/
export function create(payload) {
  return model.create({
    ...payload,
    project: ObjectId(payload.project),
    sender: ObjectId(payload.sender),
  });
}
/************************************************************************
 **************************** READ **************************************
 ************************************************************************/
export function getByUserAndProject(userId, projectId) {
  if (!userId) throw new Error("userId is required");
  if (!projectId) throw new Error("projectId is required");

  return model.findOne({
    user: ObjectId(userId),
    project: ObjectId(projectId),
    isDeleted: false,
  });
}
/************************************************************************
 **************************** UPDATE ************************************
 ************************************************************************/

/************************************************************************
 **************************** DELETE ************************************
 ************************************************************************/
export async function softDeleteById(id, deletor, options = {}) {
  if (!id) throw new Error("Page ID is required");

  if (!deletor) throw new Error("deletor is required");

  return await model.updateOne(
    { _id: id },
    {
      $set: {
        isDeleted: true,
        deletor: ObjectId(deletor),
        deletedAt: new Date(),
      },
    },
    options,
  );
}
