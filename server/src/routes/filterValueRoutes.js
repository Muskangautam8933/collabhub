import express from "express";
import * as filterValueController from "../controllers/FilterValueController.js";
import asyncHandler from "../utils/asyncHandler.js";
import { verifyToken } from "../middleware/authMiddleware.js";

const router = express.Router();

//***********************Create**************************** */
router.post("/",verifyToken, asyncHandler(filterValueController.createFilterValue));


//***********************Read**************************** */
router.get("/",verifyToken,asyncHandler(filterValueController.getFilterValue));
  

//***********************Update**************************** */
router.patch("/:id",verifyToken,asyncHandler(filterValueController.updateValueOfFilter));


//***********************Delete**************************** */
router.delete("/:id",verifyToken,asyncHandler(filterValueController.deleteFilterValue))

export default router;