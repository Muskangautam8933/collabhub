import * as filterValueRepo from "../repos/FilterValueRepo.js";
import * as filterRepo from "../repos/FilterRepo.js"

export const createFilterValue = async (req, res) => {
  const { filterId } = req.query;
  const createdRes = await filterValueRepo.createFilterValue(
    req.body,
    filterId,
    req.user.userId,
  );
  res.status(201).json(createdRes);
};

export const getFilterValue = async (req, res) => {
  const { projectId } = req.params;
  const { filterId, name } = req.query;
   
  let filterValues;
  

  if (filterId) {
    const filter = await filterRepo.getFilterById(filterId, req.user.userId);

    if (!filter || filter.project.toString() !== projectId) {
      return res.status(404).json({
        message: "Filter not found in this project",
      });
    }

    filterValues = await filterValueRepo.getFilterValueByFilter(
      filterId,
      req.user.userId
    );
  } else if (name) {
    filterValues = await filterValueRepo.getFilterValueByName(
      name,
      req.user.userId
    );
  }

  res.status(200).json(filterValues);
};

export const updateValueOfFilter = async (req, res) => {
  const { id } = req.params;
  const { name, description, color } = req.body;
  const updates = { name: name, description: description, color: color };


  const updatesFilterValue = await filterValueRepo.updateFilterValue(
    id,
    updates,
    req.user.userId,
  );
  res.status(200).json(updatesFilterValue);
};

export const deleteFilterValue = async (req, res) => {
  const { id } = req.params;
  const deleted = await filterValueRepo.deleteFilterValue(id, req.user.userId);
  res.status(200).json(deleted);
};
