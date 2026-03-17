/**
 * Repository
 * Handles all database operations
 * Based on ER Diagram Schema
 */

import FilterValue from "../models/FilterValueSchema.js";
import { ObjectId } from "../utils/ObjectId.js";

// import model from "../models/UserSchema.js";
// import { Types } from "mongoose";

/************************************************************************
 **************************** CREATE ************************************
 ************************************************************************/

export async function createFilterValue(payload, filterId, userId) {
  const createdFilterValue = await FilterValue.create({
    ...payload,
    filter: ObjectId(filterId),
    createdBy: ObjectId(userId),
  });
  return createdFilterValue;
}

/************************************************************************
 **************************** READ **************************************
 ************************************************************************/

export async function getFilterValueByFilter(filterId, userId) {
  const res = await FilterValue.find({
    filter: ObjectId(filterId),
    createdBy: ObjectId(userId),
  });

  return res;
}
export async function getFilterValueByName(name, userId) {
  const filterValueName = await FilterValue.findOne({
    name: name,
    createdBy: ObjectId(userId),
  });
  return filterValueName;
}    

/************************************************************************
 **************************** UPDATE ************************************
 ************************************************************************/

export async function updateFilterValue(id, updates, userId) {
  
  const filterValueUpdated = await FilterValue.findOneAndUpdate(
    { _id: ObjectId(id), createdBy: ObjectId(userId) },
    updates,
    { new: true, runValidators: true }
  );
    
  return filterValueUpdated;
}

/************************************************************************
 **************************** DELETE ************************************
 ************************************************************************/

export async function deleteFilterValue(id, userId) {
  const deletedRes = await FilterValue.findOneAndDelete({
    _id: ObjectId(id),
    createdBy: ObjectId(userId),
  });

  return deletedRes;
}
