/**
 * User Routes
 */
import * as controller from "../controllers/PageController.js";
import express from "express";
import asyncHandler from "../utils/asyncHandler.js";
import {
  adminGaurd,
  projectMemberGaurd,
} from "../middleware/authMiddleware.js";

const router = express.Router({ mergeParams: true });

router.post("/", adminGaurd, asyncHandler(controller.create));

// /api/projects/123/pages?meta=456
router.get("/", asyncHandler(controller.getPageByMeta));

// /api/projects/123/pages
router.get(
  "/",
  projectMemberGaurd,
  asyncHandler(controller.getPagesMetaByProjectId),
);

router.put("/:id", adminGaurd, asyncHandler(controller.updateById));

router.delete("/:id", adminGaurd, asyncHandler(controller.deletePage));

export default router;
