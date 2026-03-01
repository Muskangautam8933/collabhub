/**
 * Repository
 * Handles all database operations
 * Based on ER Diagram Schema
 */

import Model from "../models/PageMetaSchema.js";
import mongoose from "mongoose";
import { ObjectId } from "../utils/ObjectId.js";

/************************************************************************
 **************************** CREATE ************************************
 ************************************************************************/
export async function create(payload, options = {}) {
  const doc = new Model({
    ...payload,
    creator: ObjectId(payload.creator),
    project: ObjectId(payload.project),
  });

  return await doc.save(options);
}
/************************************************************************
 **************************** READ **************************************
 ************************************************************************/
export async function getByProjectId(projectId) {
  if (!projectId) throw new Error("Project ID is required");

  return await Model.find({ project: ObjectId(projectId), isDeleted: false });
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
