import TFV from "../models/TaskFilterValueSchema.js";
import { handleMongoDbErrors } from "../utils/handleMongoDBError.js";
import { ObjectId } from "../utils/ObjectId.js";

/************************************************************************
 **************************** CREATE ************************************
 ************************************************************************/
export async function create(filterValue, taskId, userId, options = {}) {
  const doc = new TFV({
    task: ObjectId(taskId),
    filterValue: ObjectId(filterValue),
    assigner: ObjectId(userId),
  });
  return await handleMongoDbErrors(() => doc.save(options));
}

/************************************************************************
 **************************** READ **************************************
 ************************************************************************/

export async function getTasksByFilterValue(taskId, filterValueId, userId) {
  const res = await TFV.find({
    task: ObjectId(taskId),
    filterValue: ObjectId(filterValueId),
    assigner: ObjectId(userId),
  });
  return res;
}

/************************************************************************
 **************************** UPDATE ************************************
 ************************************************************************/

export async function updateFilterValue(filter, payload) {
  if (!filter.task) throw new Error("task is required");
  if (!filter.filterValue) throw new Error("filterValue is required");

  console.log(filter, payload);

  const res = await TFV.findOneAndUpdate(
    { task: ObjectId(filter.task), filterValue: ObjectId(filter.filterValue) },
    payload,
  );
  return res;
}
