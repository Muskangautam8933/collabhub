/**
 * Repository
 * Handles all database operations
 * Based on ER Diagram Schema
 */

import { INVITE_STATUS } from "../common/constants.js";
import model from "../models/InviteSchema.js";
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
export function getByProject(projectId) {
  return model.find({ project: ObjectId(projectId), isDeleted: false });
}
/************************************************************************
 **************************** UPDATE ************************************
 ************************************************************************/
export function updateAcceptanceById(id, payload) {
  const { receiver } = payload;
  if (!id) throw new Error("Invite ID is required");
  if (!receiver) throw new Error("receiver is required");

  return model.updateOne(
    { _id: id },
    {
      $set: {
        receiver: ObjectId(receiver),
        status: INVITE_STATUS.ACCEPTED,
        acceptedAt: new Date(),
      },
    },
  );
}
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
