/**
 * User Repository
 * Handles all database operations related to users
 * Based on ER Diagram Schema
 */
import model from "../models/filterSchema.js";
import { ObjectId } from "../utils/ObjectId.js";

/************************************************************************
 **************************** CREATE ************************************
 ************************************************************************/
export async function create(projectId, payload, userId) {
  const doc = await model.create({
    project: ObjectId(projectId),
    ...payload,
    createdBy: ObjectId(userId),
  });

  return doc;
}

/************************************************************************
 **************************** READ **************************************
 ************************************************************************/
export async function getByProject(projectId, userId) {
  const projectFilter = await model.find({
    project: ObjectId(projectId),
    createdBy: ObjectId(userId),
  });
  return projectFilter;
}
export async function getFilterById(filterId, userId) {
  return model.findOne({
    _id: new ObjectId(filterId),
    createdBy: new ObjectId(userId),
  }).lean();
}
/************************************************************************
 **************************** UPDATE ************************************
 ************************************************************************/
export async function updateById(filterId, updates, userId) {
  const filterUpdated = await model.findOneAndUpdate(
    { _id: ObjectId(filterId), createdBy: ObjectId(userId) },
    updates,
    { new: true, runValidators: true },
  );
  return filterUpdated;
}
/************************************************************************
 **************************** DELETE ************************************
 ************************************************************************/
export async function deleteById(FilterId, userId) {
  const deletedFilter = await model.findOneAndDelete({
    _id: ObjectId(FilterId),
    createdBy: ObjectId(userId),
  });
  return deletedFilter;
}
