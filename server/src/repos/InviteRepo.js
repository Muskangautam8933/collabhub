/**
 * Repository
 * Handles all database operations
 * Based on ER Diagram Schema
 */

import { INVITE_STATUS } from "../common/constants.js";
import Model from "../models/InviteSchema.js";
import { ObjectId } from "../utils/ObjectId.js";
import { handleMongoDbErrors } from "../utils/handleMongoDBError.js";

/************************************************************************
 **************************** CREATE ************************************
 ************************************************************************/
export async function create(payload) {
  const doc = new Model({
    ...payload,
    project: ObjectId(payload.project),
    sender: ObjectId(payload.sender),
  });

  return await handleMongoDbErrors(() => doc.save());
}
/************************************************************************
 **************************** READ **************************************
 ************************************************************************/
export function getByProject(projectId) {
  if (!projectId) throw new Error("projectId is required");
  return Model.find({
    project: ObjectId(projectId),
    status: INVITE_STATUS.PENDING,
    isDeleted: false,
  })
    .populate("sender")
    .exec();
}

export function getByEmail(email) {
  if (!email) throw new Error("email is required");
  return Model.find({ email: email.toLowerCase() });
}

export function getDeletedByEmail(email) {
  if (!email) throw new Error("email is required");
  return Model.findOne({ email: email.toLowerCase(), isDeleted: true });
}

export function getById(id) {
  if (!id) throw new Error("Invite ID is required");
  return Model.findById(id);
}

/************************************************************************
 **************************** UPDATE ************************************
 ************************************************************************/
export function updateAcceptanceByEmail(email, payload, options = {}) {
  const { receiver } = payload;
  if (!email) throw new Error("email is required");
  if (!receiver) throw new Error("receiver is required");

  return Model.updateOne(
    { email },
    {
      $set: {
        receiver: ObjectId(receiver),
        status: INVITE_STATUS.ACCEPTED,
        acceptedAt: new Date(),
      },
    },
    {
      upsert: true,
      session: options.session,
    },
  );
}

export async function restoreById(id, payload = {}, options = {}) {
  if (!id) throw new Error("inviteId is required");

  return await handleMongoDbErrors(() =>
    Model.findOneAndUpdate(
      { _id: ObjectId(id) },
      {
        $set: {
          ...payload,
          sender: ObjectId(payload.sender),
          status: INVITE_STATUS.PENDING,
          isDeleted: false,
          deletedAt: null,
          deletor: null,
        },
      },
      { new: true, session: options.session },
    ),
  );
}
/************************************************************************
 **************************** DELETE ************************************
 ************************************************************************/
export async function softDeleteById(id, deletor, options = {}) {
  if (!id) throw new Error("inviteId is required");

  if (!deletor) throw new Error("deletor is required");

  return await Model.updateOne(
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
