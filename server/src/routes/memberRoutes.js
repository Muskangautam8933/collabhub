/**
 * User Routes
 */
import express from "express";
import * as controller from "../controllers/MemberController.js";
import { adminGaurd, memberGaurd } from "../middleware/authMiddleware.js";

const router = express.Router({ mergeParams: true });

router.get("/", memberGaurd, adminGaurd, controller.getAllProjectMembers);

// router.post("/", controller.create);

// router.put("/:id", controller.updateById);

// router.delete("/:id", controller.deleteById);

export default router;
