import * as filterRepo from "../repos/FilterRepo.js";

export const createFilter = async (req, res) => {
  const createdFilter = await filterRepo.create(req.body);
  res.status(201).json(createdFilter);
};

export const getFilterByProject = async (req, res) => {
  const { projectId } = req.query;
  const filterRes = await filterRepo.getByProject(projectId);
  res.status(200).json(filterRes);
};

export const updateFilter = async (req, res) => {
  const { id } = req.params;
  const { name, description } = req.body;
  const updates = {
    name: name,
    description: description,
  };
  const filterUpdated = await filterRepo.updateById(id, updates);

    res.status(200).json(filterUpdated)
};

export const deleteFilter = async (req, res) => {
  const { id } = req.params;
  const deletedRes = await filterRepo.deleteById(id);

  res.status(204);
};
