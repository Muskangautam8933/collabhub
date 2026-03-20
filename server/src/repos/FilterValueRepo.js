/**
 * Repository
 * Handles all database operations
 * Based on ER Diagram Schema
 */

import FilterValue from "../models/FilterValueSchema.js";
import { ObjectId } from "../utils/ObjectId.js";

/************************************************************************
 **************************** CREATE ************************************
 ************************************************************************/

export async function createFilterValue(payload, filterId, userId) {
  const createdFilterValue = await FilterValue.create({
    ...payload,
    filter: ObjectId(filterId),
    creator: ObjectId(userId),
  });
  return createdFilterValue;
}

/************************************************************************
 **************************** READ **************************************
 ************************************************************************/

export async function getFilterValueByFilter(filterId, userId) {
  const res = await FilterValue.find({
    filter: ObjectId(filterId),
    creator: ObjectId(userId),
  });

  return res;
}
export async function getFilterValueByName(name, userId) {
  const filterValueName = await FilterValue.findOne({
    name: name,
    creator: ObjectId(userId),
  });
  return filterValueName;
}

/************************************************************************
 **************************** UPDATE ************************************
 ************************************************************************/

export async function updateFilterValue(id, updates, userId) {
  const filterValueUpdated = await FilterValue.findOneAndUpdate(
    { _id: ObjectId(id), creator: ObjectId(userId) },
    updates,
    { new: true, runValidators: true },
  );

  return filterValueUpdated;
}

/************************************************************************
 **************************** DELETE ************************************
 ************************************************************************/

export async function deleteFilterValue(id, userId) {
  const deletedRes = await FilterValue.findOneAndDelete({
    _id: ObjectId(id),
    creator: ObjectId(userId),
  });

  return deletedRes;
}

export async function deleteByFilter(filterId, userId) {
  const deletedFilter = await FilterValue.deleteMany({
    filter: ObjectId(filterId),
  });
  return deletedFilter;
}
