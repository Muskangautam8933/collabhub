/**
 * User Routes
 */
import express from "express";
import * as userController from "../controllers/UserController.js";

const router = express.Router();

router.get("/", userController.getUsers);

router.delete("/", userController.deleteByEmail);

router.delete("/:id", userController.deleteUser);

export default router;
