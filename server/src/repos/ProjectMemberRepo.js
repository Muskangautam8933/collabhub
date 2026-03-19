/**
 * Repository
 * Handles all database operations
 * Based on ER Diagram Schema
 */

import { INVITE_STATUS } from "../common/constants.js";
import Model from "../models/ProjectMemberSchema.js";
import { handleMongoDbErrors } from "../utils/handleMongoDBError.js";
import { ObjectId } from "../utils/ObjectId.js";

/************************************************************************
 **************************** CREATE ************************************
 ************************************************************************/
export async function create(payload, options = {}) {
  const doc = new Model({
    ...payload,
    project: ObjectId(payload.project),
    user: ObjectId(payload.user),
    invite: ObjectId(payload.invite),
  });

  return await handleMongoDbErrors(() => doc.save(options));
}
/************************************************************************
 **************************** READ **************************************
 ************************************************************************/
export function getByUserAndProject(userId, projectId) {
  if (!userId) throw new Error("userId is required");
  if (!projectId) throw new Error("projectId is required");

  return Model.findOne({
    user: ObjectId(userId),
    project: ObjectId(projectId),
    isDeleted: false,
  });
}

export function getAllProjectMembers(projectId) {
  if (!projectId) throw new Error("projectId is required");

  return Model.find({ project: ObjectId(projectId), isDeleted: false })
    .populate("user")
    .exec();
}

export function getById(memberId) {
  if (!memberId) throw new Error("memberId is required");
  return Model.findById(ObjectId(memberId));
}

export function getDeletedMemberByProjectAndUser(projectId, user) {
  if (!projectId) throw new Error("projectId is required");
  if (!user) throw new Error("user is required");
  return Model.findOne({
    project: ObjectId(projectId),
    user: ObjectId(user),
    isDeleted: true,
  });
}

/************************************************************************
 **************************** UPDATE ************************************
 ************************************************************************/
export function updateMemberRole(projectId, memberId, role) {
  if (!projectId) throw new Error("projectId is required");
  if (!memberId) throw new Error("memberId is required");
  if (!role) throw new Error("role is required");

  return Model.updateOne(
    { project: ObjectId(projectId), _id: ObjectId(memberId) },
    { $set: { role } },
    { new: true },
  );
}

export async function restoreById(id, payload = {}, options = {}) {
  if (!id) throw new Error("memberId is required");

  return await handleMongoDbErrors(() =>
    Model.findOneAndUpdate(
      { _id: ObjectId(id) },
      {
        $set: {
          ...payload,
          user: ObjectId(payload.user),
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
  if (!id) throw new Error("memberId is required");

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
