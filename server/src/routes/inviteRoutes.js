/**
 * User Routes
 */
import express from "express";
import * as controller from "../controllers/InviteController.js";
import { adminGaurd, memberGaurd } from "../middleware/authMiddleware.js";

const router = express.Router({ mergeParams: true });

router.post("/", memberGaurd, adminGaurd, controller.create);

router.get("/", controller.getByEmail);

router.get("/", memberGaurd, adminGaurd, controller.getByProject);

router.patch("/", controller.accept);

router.delete("/:id", memberGaurd, adminGaurd, controller.deleteById);

export default router;
