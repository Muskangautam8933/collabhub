import * as filterRepo from "../repos/FilterRepo.js";
import { ObjectId } from "../utils/ObjectId.js";

export const createFilter = async (req, res) => {
  const { projectId } = req.params;

  console.log("projectId:", projectId); // check this

  const createdFilter = await filterRepo.create(
    ObjectId(projectId),
    req.body,   
    req.user.userId
  );

  res.status(201).json(createdFilter);
};

export const getFilterByProject = async (req, res) => {
  const { projectId } = req.params;
  const filterRes = await filterRepo.getByProject(ObjectId(projectId),req.user.userId);
  res.status(200).json(filterRes);
};

export const updateFilter = async (req, res) => {
  const { id } = req.params;
  const { name, description } = req.body;
  const updates = {
    name: name,
    description: description,
  };
  const filterUpdated = await filterRepo.updateById(id,updates,req.user.userId);

    res.status(200).json(filterUpdated)
};

export const deleteFilter = async (req, res) => {
  const { id } = req.params;
  const deletedRes = await filterRepo.deleteById(id,req.user.userId);

  res.status(200).json(deletedRes);
};
