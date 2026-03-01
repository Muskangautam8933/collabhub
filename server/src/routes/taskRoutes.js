import asyncHandler from "../utils/asyncHandler.js";
import * as taskController from "../controllers/TaskController.js"
import express from "express";


const router = express.Router()

router.post("/",asyncHandler(taskController.taskCreate))

router.get("/",asyncHandler(taskController.getTasks))

export default router;
