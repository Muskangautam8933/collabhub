import TFV from "../models/TaskFilterValueSchema.js";
import { ObjectId } from "../utils/ObjectId.js";

export async function create(filterValue, taskId, userId) {
  const created = await TFV.create({
    task: ObjectId(taskId),
    filterValue: ObjectId(filterValue),
    assigner: ObjectId(userId),
  });
  return created;
}

export async function getTasksByFilterValue(taskId, filterValueId, userId) {
  const res = await TFV.find({
    task: ObjectId(taskId),
    filterValue: ObjectId(filterValueId),
    assigner: ObjectId(userId),
  });
  return res;
}
