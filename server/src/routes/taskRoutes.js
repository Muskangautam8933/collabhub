import asyncHandler from "../utils/asyncHandler.js";
import * as taskController from "../controllers/TaskController.js";
import express from "express";

const router = express.Router({ mergeParams: true });

/**
 * @swagger
 * /api/projects/{projectId}/tasks:
 *   post:
 *     summary: Create a task
 *     tags: [Tasks]
 *     security:
 *       - bearerAuth: []
 *       - cookieAuth: []
 *     parameters:
 *       - in: path
 *         name: projectId
 *         required: true
 *         schema:
 *           type: string
 *         description: ID of the project
 *         example: "69a3276fef8dabd1e64e4330"
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - title
 *               - description
 *               - filterValue
 *             properties:
 *               title:
 *                 type: string
 *                 description: Title of the task
 *                 example: Frontend Development
 *               description:
 *                 type: string
 *                 description: Description of the task
 *                 example: Build UI using React
 *               filterValue:
 *                 type: string
 *                 description: Filter value of the task
 *                 example: 69bacc44d80103174902cef5
 *     responses:
 *       201:
 *         description: Task created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                     _id:
 *                       type: string
 *                     title:
 *                       type: string
 *                     description:
 *                       type: string
 *                     project:
 *                       type: string
 *                     creator:
 *                       type: string
 *                       format: date-time
 *                     startDate:
 *                       type: string
 *                       format: date-time
 *                     endDate:
 *                       type: string
 *                       format: date-time
 *                     updatedAt:
 *                       type: string
 *                       format: date-time
 *                     createdAt:
 *                       type: string
 *                       format: date-time
 *                     __v:
 *                       type: integer
 *       400:
 *         description: Bad request - Invalid input data
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Project not found
 *       500:
 *         description: Internal server error
 */
router.post("/", asyncHandler(taskController.createTaskWithfv));

// router.post("/",asyncHandler(taskController.taskCreate))

router.get("/", asyncHandler(taskController.getTasks));

router.get("/", asyncHandler(taskController.getTasksByFilterValue));

router.get("/", asyncHandler(taskController.getTaskByFilter));

router.patch("/:taskId", asyncHandler(taskController.updateTask));

router.delete("/:taskId", asyncHandler(taskController.deleteTask));

export default router;
