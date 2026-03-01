import express from "express";
import * as filterController from "../controllers/FilterController.js";
import asyncHandler from "../utils/asyncHandler.js";

const router = express.Router();

//***********************Create**************************** */
router.post("/", asyncHandler(filterController.createFilter));

//***********************Read**************************** */
router.get("/", asyncHandler(filterController.getFilterByProject));

//***********************Update**************************** */
router.patch("/:id",asyncHandler(filterController.updateFilter))

//***********************Delete**************************** */
router.delete("/:id", asyncHandler(filterController.deleteFilter));

export default router;
