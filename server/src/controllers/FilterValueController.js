import * as filterValueRepo from "../repos/FilterValueRepo.js";

export const createFilterValue = async (req, res) => {
  const { filterId } = req.query;
  const createdRes = await filterValueRepo.createFilterValue(
    req.body,
    filterId,
    req.user.userId  
  );
  res.status(201).json(createdRes);
};

export const getFilterValue = async (req, res) => {
  const { filterId } = req.query;
  const { name } = req.query;
  let filterValue;
  if (filterId) {
    filterValue = await filterValueRepo.getFilterValueByFilter(filterId,req.user.userId);
  } else {
    filterValue = await filterValueRepo.getFilterValueByName(name,req.user.userId);
  }
  res.status(200).json(filterValue);
};

export const updateValueOfFilter = async (req, res) => {
  const { id } = req.params;
  const { name, description, color } = req.body;
  const updates = { name: name, description: description, color: color }; 
  
  console.log("UserId:", req.user.userId);
  console.log("FilterValueId:", id);

  const updatesFilterValue = await filterValueRepo.updateFilterValue(
    id,
    updates,
    req.user.userId  
  );
  res.status(200).json(updatesFilterValue);
};

export const deleteFilterValue = async (req, res) => {
  const { id } = req.params;
  const deleted = await filterValueRepo.deleteFilterValue(id,req.user.userId);
  res.status(200).json(deleted);
};
