import TFV from "../models/TaskFilterValueSchema.js";
import { handleMongoDbErrors } from "../utils/handleMongoDBError.js";
import { ObjectId } from "../utils/ObjectId.js";

export async function create(filterValue, taskId, userId, options = {}) {
  const doc = new TFV({
    task: ObjectId(taskId),
    filterValue: ObjectId(filterValue),
    assigner: ObjectId(userId),
  });
  return await handleMongoDbErrors(() => doc.save(options));
}

export async function getTasksByFilterValue(taskId, filterValueId, userId) {
  const res = await TFV.find({
    task: ObjectId(taskId),
    filterValue: ObjectId(filterValueId),
    assigner: ObjectId(userId),
  });
  return res;
}
