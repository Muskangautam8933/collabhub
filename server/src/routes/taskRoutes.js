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
router.post("/", taskController.createTaskWithfilterValue);

/**
 * @swagger
 * /api/projects/{projectId}/tasks:
 *   get:
 *     summary: Get all tasks of a project
 *     description: Fetch tasks by project ID with optional filtering and search by title
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
 *
 *       - in: query
 *         name: filter
 *         schema:
 *           type: string
 *         required: false
 *         description: Filter ID (e.g., status, priority, label)
 *
 *       - in: query
 *         name: title
 *         schema:
 *           type: string
 *         required: false
 *         description: Search tasks by title
 *
 *     responses:
 *       200:
 *         description: List of tasks fetched successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   _id:
 *                     type: string
 *                   title:
 *                     type: string
 *                   description:
 *                     type: string
 *                   project:
 *                     type: string
 *                   creator:
 *                     type: string
 *                   startDate:
 *                     type: string
 *                     format: date-time
 *                     nullable: true
 *                   dueDate:
 *                     type: string
 *                     format: date-time
 *                     nullable: true
 *                   createdAt:
 *                     type: string
 *                     format: date-time
 *                   updatedAt:
 *                     type: string
 *                     format: date-time
 *                   filters:
 *                     type: array
 *                     items:
 *                       type: object
 *                       properties:
 *                         filterId:
 *                           type: string
 *                         valueId:
 *                           type: string
 *                         valueName:
 *                           type: string
 *                         color:
 *                           type: string
 *                   __v:
 *                     type: integer
 *
 *       400:
 *         description: Bad request - Invalid input
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Project not found
 *       500:
 *         description: Internal server error
 */
router.get("/", taskController.getTasks);

/**
 * @swagger
 * /api/projects/{projectId}/tasks/{taskId}/taskfiltervalues:
 *   post:
 *     summary: Add new filtervalue for a task
 *     description: Fetch tasks by project ID with optional filtering and search by title
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
 *
 *       - in: path
 *         name: taskId
 *         schema:
 *           type: string
 *         required: false
 *         description: ID of the task
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - filterValue
 *             properties:
 *               filterValue:
 *                 type: string
 *                 description: ID of the filter value
 *     responses:
 *       200:
 *         description: List of tasks fetched successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   _id:
 *                     type: string
 *                   title:
 *                     type: string
 *                   description:
 *                     type: string
 *                   project:
 *                     type: string
 *                   creator:
 *                     type: string
 *                   startDate:
 *                     type: string
 *                     format: date-time
 *                     nullable: true
 *                   dueDate:
 *                     type: string
 *                     format: date-time
 *                     nullable: true
 *                   createdAt:
 *                     type: string
 *                     format: date-time
 *                   updatedAt:
 *                     type: string
 *                     format: date-time
 *                   filters:
 *                     type: array
 *                     items:
 *                       type: object
 *                       properties:
 *                         filterId:
 *                           type: string
 *                         valueId:
 *                           type: string
 *                         valueName:
 *                           type: string
 *                         color:
 *                           type: string
 *                   __v:
 *                     type: integer
 *
 *       400:
 *         description: Bad request - Invalid input
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Project not found
 *       500:
 *         description: Internal server error
 */
router.post("/:taskId/taskfiltervalues", taskController.addNewFilterValue);

/**
 * @swagger
 * /api/projects/{projectId}/tasks/{taskId}/taskfiltervalues:
 *   patch:
 *     summary: update the existing filtervalue for a task
 *     description: Update tasks by project ID with optional filtering and search by title
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
 *
 *       - in: path
 *         name: taskId
 *         schema:
 *           type: string
 *         required: false
 *         description: ID of the task
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - filterValue
 *             properties:
 *               filterValue:
 *                 type: string
 *                 description: ID of the filter value
 *     responses:
 *       200:
 *         description: List of tasks fetched successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   _id:
 *                     type: string
 *                   title:
 *                     type: string
 *                   description:
 *                     type: string
 *                   project:
 *                     type: string
 *                   creator:
 *                     type: string
 *                   startDate:
 *                     type: string
 *                     format: date-time
 *                     nullable: true
 *                   dueDate:
 *                     type: string
 *                     format: date-time
 *                     nullable: true
 *                   createdAt:
 *                     type: string
 *                     format: date-time
 *                   updatedAt:
 *                     type: string
 *                     format: date-time
 *                   filters:
 *                     type: array
 *                     items:
 *                       type: object
 *                       properties:
 *                         filterId:
 *                           type: string
 *                         valueId:
 *                           type: string
 *                         valueName:
 *                           type: string
 *                         color:
 *                           type: string
 *                   __v:
 *                     type: integer
 *
 *       400:
 *         description: Bad request - Invalid input
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Project not found
 *       500:
 *         description: Internal server error
 */
router.patch(
  "/:taskId/taskfiltervalues",
  taskController.updateExistingFilterValue,
);

router.delete("/:taskId", taskController.deleteTask);

export default router;
