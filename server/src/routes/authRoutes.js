/**
 * Authentication Routes
 */
import express from "express";
import * as authController from "../controllers/AuthController.js";
import { AuthGuard } from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/me", AuthGuard, authController.me);

/**
 * Register with email and password
 */
router.post("/register", authController.register);

/**
 * Login with email and password
 */
router.post("/login", authController.login);

/**
 * Google OAuth Routes
 */
router.get("/login", authController.getConsent);

/**
 * Google OAuth Callback
 */
router.get("/google/oauth2callback", authController.googleAuth);

export default router;
