/**
 * Member Routes
 */
import express from "express";
import * as controller from "../controllers/MemberController.js";
import { adminGaurd, memberGaurd } from "../middleware/authMiddleware.js";

const router = express.Router({ mergeParams: true });

/**
 * @swagger
 * /api/projects/{projectId}/members:
 *   get:
 *     summary: Get all members of a project
 *     tags: [Members]
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
 *     responses:
 *       200:
 *         description: List of project members retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: string
 *                   userId:
 *                     type: string
 *                   projectId:
 *                     type: string
 *                   role:
 *                     type: string
 *                     enum: [owner, admin, member]
 *                   joinedAt:
 *                     type: string
 *                     format: date-time
 *                   user:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: string
 *                       name:
 *                         type: string
 *                       email:
 *                         type: string
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden - Not a project member
 *       404:
 *         description: Project not found
 */
router.get("/", memberGaurd, controller.getAllProjectMembers);

// router.post("/", controller.create);

/**
 * @swagger
 * /api/projects/{projectId}/members/{memberId}:
 *   patch:
 *     summary: Update a project member's role
 *     tags: [Members]
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
 *       - in: path
 *         name: memberId
 *         required: true
 *         schema:
 *           type: string
 *         description: ID of the member
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - role
 *             properties:
 *               role:
 *                 type: string
 *                 enum: [admin, member]
 *                 description: New role for the member
 *     responses:
 *       200:
 *         description: Member role updated successfully
 *       400:
 *         description: Bad request - Invalid role
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden - Not authorized to update member roles
 *       404:
 *         description: Member not found
 */
router.patch("/:memberId", memberGaurd, adminGaurd, controller.updateById);

/**
 * @swagger
 * /api/projects/{projectId}/members/{memberId}:
 *   delete:
 *     summary: Remove a member from a project
 *     tags: [Members]
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
 *       - in: path
 *         name: memberId
 *         required: true
 *         schema:
 *           type: string
 *         description: ID of the member to remove
 *     responses:
 *       200:
 *         description: Member removed successfully
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden - Not authorized to remove members
 *       404:
 *         description: Member not found
 */
router.delete("/:memberId", memberGaurd, adminGaurd, controller.deleteById);

export default router;
