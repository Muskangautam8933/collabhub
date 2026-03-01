/**
 * Repository
 * Handles all database operations
 * Based on ER Diagram Schema
 */

import Model from "../models/PageSchema.js";
import { ObjectId } from "../utils/ObjectId.js";

/************************************************************************
 **************************** CREATE ************************************
 ************************************************************************/
export async function create(payload, options = {}) {
  const doc = new Model({
    ...payload,
    meta: ObjectId(payload.meta),
  });

  return await doc.save(options);
}
/************************************************************************
 **************************** READ **************************************
 ************************************************************************/
export async function getById(id, options = { session: null }) {
  if (!id) throw new Error("Page ID is required");

  return await Model.findOne({ _id: id, isDeleted: false }).session(
    options.session,
  );
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
