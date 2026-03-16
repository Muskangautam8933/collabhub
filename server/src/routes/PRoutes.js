import express from "express";
import { getProject } from "../controllers/ProjectController.js";
import { updateProject } from "../controllers/ProjectController.js";
import { deleteProject } from "../controllers/ProjectController.js";
import asyncHandler from "../utils/asyncHandler.js";
import { memberGaurd } from "../middleware/authMiddleware.js";
import pagesRoutes from "./pageRoutes.js";

const router = express.Router({ mergeParams: true });

router.get("/:projectId", memberGaurd, asyncHandler(getProject));
router.put("/:projectId", asyncHandler(updateProject));
router.delete("/:projectId", asyncHandler(deleteProject));

router.use("/pages",pagesRoutes)

export default router;
