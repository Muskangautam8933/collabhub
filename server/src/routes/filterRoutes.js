import express from "express";
import * as filterController from "../controllers/FilterController.js";
import asyncHandler from "../utils/asyncHandler.js";
import { verifyToken } from "../middleware/authMiddleware.js";

const router = express.Router({ mergeParams: true });

//***********************Create**************************** */
router.post("/",verifyToken, asyncHandler(filterController.createFilter));

//***********************Read**************************** */
router.get("/",verifyToken, asyncHandler(filterController.getFilterByProject));

//***********************Update**************************** */
router.patch("/:id",verifyToken,asyncHandler(filterController.updateFilter))

//***********************Delete**************************** */
router.delete("/:id",verifyToken,asyncHandler(filterController.deleteFilter));

export default router;
