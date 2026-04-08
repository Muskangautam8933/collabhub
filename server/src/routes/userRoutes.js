/**
 * User Routes
 */
import express from "express";
import * as userController from "../controllers/UserController.js";
import { verifyToken } from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/", userController.getUsers);

router.get("/:id/profile", verifyToken, userController.getUserProfile);

router.delete("/", userController.deleteByEmail);

router.delete("/:id", userController.deleteUser);

export default router;
