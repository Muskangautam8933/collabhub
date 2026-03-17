import asyncHandler from "../utils/asyncHandler.js";
import * as taskController from "../controllers/TaskController.js"
import express from "express"; 
import { verifyToken } from "../middleware/authMiddleware.js";

const router = express.Router({ mergeParams: true })

router.post("/",verifyToken,asyncHandler(taskController.createTaskByfv))

router.post("/",verifyToken,asyncHandler(taskController.taskCreate))

router.get("/",verifyToken,asyncHandler(taskController.getTasks))

router.get("/",verifyToken,asyncHandler(taskController.getTasksByFilterValue))

router.get("/",verifyToken,asyncHandler(taskController.getTaskByFilter))

router.patch("/:taskId",verifyToken,asyncHandler(taskController.updateTask))

router.delete("/:taskId",verifyToken,asyncHandler(taskController.deleteTask))

export default router;
