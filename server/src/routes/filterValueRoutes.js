import express from "express";
import * as filterValueController from "../controllers/FilterValueController.js";
import asyncHandler from "../utils/asyncHandler.js";

const router = express.Router({ mergeParams: true });

//***********************Create**************************** */
router.post("/", asyncHandler(filterValueController.createFilterValue));


//***********************Read**************************** */
router.get("/",asyncHandler(filterValueController.getFilterValue));
  

//***********************Update**************************** */
router.patch("/:id",asyncHandler(filterValueController.updateValueOfFilter));


//***********************Delete**************************** */
router.delete("/:id",asyncHandler(filterValueController.deleteFilterValue))

export default router;