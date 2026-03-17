// /**
//  * User Routes
//  */
import express from "express";
import * as controller from "../controllers/InviteController.js";
import { adminGaurd } from "../middleware/authMiddleware.js";

const router = express.Router({ mergeParams: true });

router.post("/", adminGaurd, controller.create);

// router.get("/", asyncHandler(controller.findAll));

router.patch("/", controller.accept);

// router.delete("/:id", asyncHandler(controller.deleteById));

export default router;
