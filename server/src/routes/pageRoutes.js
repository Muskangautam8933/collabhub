/**
 * User Routes
 */
import express from "express";
import * as controller from "../controllers/PageController.js";
import asyncHandler from "../utils/asyncHandler.js";
import { verifyToken } from "../middleware/authMiddleware.js";

const router = express.Router({ mergeParams: true });

router.get("/", verifyToken, asyncHandler(controller.getPagesMetaByProjectId));

router.post("/", verifyToken, asyncHandler(controller.create));

// router.put("/:id", asyncHandler(controller.updateById));

router.delete("/:id", verifyToken, asyncHandler(controller.deletePage));

export default router;
