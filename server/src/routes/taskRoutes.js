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
 *               - name
 *               - description
 *             properties:
 *               name:
 *                 type: string
 *                 description: Name of the task
 *                 example: Frontend Development
 *               description:
 *                 type: string
 *                 description: Description of the task
 *                 example: Build UI using React
 *     responses:
 *       201:
 *         description: Task created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 data:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: string
 *                     name:
 *                       type: string
 *                     description:
 *                       type: string
 *                     projectId:
 *                       type: string
 *                     createdAt:
 *                       type: string
 *                       format: date-time
 *                     updatedAt:
 *                       type: string
 *                       format: date-time
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
