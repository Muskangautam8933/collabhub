/**
 * Authentication Routes
 */

import express from "express";
import * as authController from "../controllers/AuthController.js";
import asyncHandler from "../utils/asyncHandler.js";

const router = express.Router();

/**
 * Register with email and password
 */
router.post("/register", asyncHandler(authController.register));

/**
 * Login with email and password
 */
router.post("/login", asyncHandler(authController.login));

/**
 * Google OAuth Routes
 */
router.get("/login", asyncHandler(authController.getConsent));

/**
 * Google OAuth Callback
 */
router.get("/google/oauth2callback", asyncHandler(authController.googleAuth));

export default router;
