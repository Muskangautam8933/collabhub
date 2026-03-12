/**
 * User Routes
 */
import express from "express";
import * as controller from "../controllers/MemberController.js";
import { adminGaurd, memberGaurd } from "../middleware/authMiddleware.js";

const router = express.Router({ mergeParams: true });

router.get("/", memberGaurd, controller.getAllProjectMembers);

// router.post("/", controller.create);

router.patch("/:memberId", memberGaurd, adminGaurd, controller.updateById);

router.delete("/:memberId", memberGaurd, adminGaurd, controller.deleteById);

export default router;
