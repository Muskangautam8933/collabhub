import asyncHandler from "../utils/asyncHandler.js";
import * as taskController from "../controllers/TaskController.js"
import express from "express"; 


const router = express.Router({ mergeParams: true })

router.post("/",asyncHandler(taskController.taskCreate))

router.get("/",asyncHandler(taskController.getTasks))

router.patch("/:taskId",asyncHandler(taskController.updateTask))

router.delete("/:taskId",asyncHandler(taskController.deleteTask))

export default router;
