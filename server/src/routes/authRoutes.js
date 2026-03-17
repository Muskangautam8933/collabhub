/**
 * Authentication Routes
 */
import express from "express";
import * as authController from "../controllers/AuthController.js";
import { AuthGuard } from "../middleware/authMiddleware.js";

const router = express.Router();

/**
 * @swagger
 * /auth/me:
 *   get:
 *     summary: Get current user profile
 *     tags: [Authentication]
 *     security:
 *       - bearerAuth: []
 *       - cookieAuth: []
 *     responses:
 *       200:
 *         description: User profile retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: string
 *                 email:
 *                   type: string
 *                 name:
 *                   type: string
 *       401:
 *         description: Unauthorized - Invalid or missing token
 */
router.get("/me", AuthGuard, authController.me);

/**
 * @swagger
 * /auth/register:
 *   post:
 *     summary: Register a new user with email and password
 *     tags: [Authentication]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *               - name
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *               password:
 *                 type: string
 *                 minLength: 6
 *               name:
 *                 type: string
 *     responses:
 *       201:
 *         description: User registered successfully
 *       400:
 *         description: Bad request - Invalid input data
 *       409:
 *         description: Conflict - User already exists
 */
router.post("/register", authController.register);

/**
 * @swagger
 * /auth/login:
 *   post:
 *     summary: Login with email and password
 *     tags: [Authentication]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *                 required: true
 *                 description: User email
 *                 example: test@example.com
 *               password:
 *                 type: string
 *                 required: true
 *                 description: User password       
 *                 example: test@example.com
 *     responses:
 *       200:
 *         description: Login successful
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 token:
 *                   type: string
 *                 user:
 *                   type: object
 *       401:
 *         description: Unauthorized - Invalid credentials
 */
router.post("/login", authController.login);

/**
 * @swagger
 * /auth/login:
 *   get:
 *     summary: Initiate Google OAuth login
 *     tags: [Authentication]
 *     responses:
 *       302:
 *         description: Redirect to Google OAuth
 */
router.get("/login", authController.getConsent);

/**
 * @swagger
 * /auth/logout:
 *   get:
 *     summary: Logout user
 *     tags: [Authentication]
 *     responses:
 *       200:
 *         description: Logout successful
 */
router.get("/logout", authController.logout);

/**
 * @swagger
 * /auth/google/oauth2callback:
 *   get:
 *     summary: Google OAuth callback
 *     tags: [Authentication]
 *     parameters:
 *       - in: query
 *         name: code
 *         required: true
 *         schema:
 *           type: string
 *         description: Authorization code from Google
 *     responses:
 *       302:
 *         description: Redirect to frontend with token
 *       401:
 *         description: OAuth authentication failed
 */
router.get("/google/oauth2callback", authController.googleAuth);

export default router;
