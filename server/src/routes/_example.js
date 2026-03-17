// /**
//  * [RESOURCE_NAME] Routes - Template File
//  *
//  * This is a template file for creating new route files.
//  * Copy this file and rename it to your resource name (e.g., productRoutes.js)
//  *
//  * STEPS TO CREATE A NEW ROUTE FILE:
//  * 1. Copy this file to a new name (e.g., `cp _example.js productRoutes.js`)
//  * 2. Replace [RESOURCE_NAME] with your actual resource name (e.g., Products)
//  * 3. Replace [resource] with your actual resource name in lowercase (e.g., products)
//  * 4. Update the controller import path
//  * 5. Uncomment and modify the routes you need
//  * 6. Update Swagger documentation with your specific schemas
//  * 7. Add any additional middleware as needed
//  */

// import express from "express";
// // import * as controller from "../controllers/[ResourceName]Controller.js"; // TODO: Update controller import

// // Import common middleware
// // import { AuthGuard, memberGaurd, adminGaurd } from "../middleware/authMiddleware.js";
// // import { validateRequest } from "../middleware/validationMiddleware.js"; // If you have validation middleware
// // import { rateLimit } from "../middleware/rateLimitMiddleware.js"; // If you have rate limiting

// const router = express.Router({ mergeParams: true });

// /**
//  * @swagger
//  * /api/[resources]:
//  *   get:
//  *     summary: Get all [resources]
//  *     tags: [[RESOURCE_NAME]]
//  *     security:
//  *       - bearerAuth: []
//  *       - cookieAuth: []
//  *     parameters:
//  *       - in: query
//  *         name: page
//  *         schema:
//  *           type: integer
//  *           minimum: 1
//  *           default: 1
//  *         description: Page number for pagination
//  *       - in: query
//  *         name: limit
//  *         schema:
//  *           type: integer
//  *           minimum: 1
//  *           maximum: 100
//  *           default: 10
//  *         description: Number of items per page
//  *       - in: query
//  *         name: search
//  *         schema:
//  *           type: string
//  *         description: Search term to filter results
//  *       - in: query
//  *         name: sortBy
//  *         schema:
//  *           type: string
//  *         description: Field to sort by
//  *       - in: query
//  *         name: sortOrder
//  *         schema:
//  *           type: string
//  *           enum: [asc, desc]
//  *           default: asc
//  *         description: Sort order
//  *     responses:
//  *       200:
//  *         description: List of [resources] retrieved successfully
//  *         content:
//  *           application/json:
//  *             schema:
//  *               type: object
//  *               properties:
//  *                 data:
//  *                   type: array
//  *                   items:
//  *                     type: object
//  *                     properties:
//  *                       id:
//  *                         type: string
//  *                       // TODO: Add your resource properties here
//  *                       name:
//  *                         type: string
//  *                       createdAt:
//  *                         type: string
//  *                         format: date-time
//  *                       updatedAt:
//  *                         type: string
//  *                         format: date-time
//  *                 pagination:
//  *                   type: object
//  *                   properties:
//  *                     page:
//  *                       type: integer
//  *                     limit:
//  *                       type: integer
//  *                     total:
//  *                       type: integer
//  *                     totalPages:
//  *                       type: integer
//  *       400:
//  *         description: Bad request - Invalid query parameters
//  *       401:
//  *         description: Unauthorized
//  *       500:
//  *         description: Internal server error
//  */
// // router.get("/", asyncHandler(controller.getAll));

// /**
//  * @swagger
//  * /api/[resources]:
//  *   post:
//  *     summary: Create a new [resource]
//  *     tags: [[RESOURCE_NAME]]
//  *     security:
//  *       - bearerAuth: []
//  *       - cookieAuth: []
//  *     requestBody:
//  *       required: true
//  *       content:
//  *         application/json:
//  *           schema:
//  *             type: object
//  *             required:
//  *               - name // TODO: Update required fields
//  *             properties:
//  *               name:
//  *                 type: string
//  *                 description: Name of the [resource]
//  *                 example: "Sample [Resource]"
//  *               description:
//  *                 type: string
//  *                 description: Description of the [resource]
//  *                 example: "This is a sample [resource] description"
//  *               // TODO: Add more properties as needed
//  *     responses:
//  *       201:
//  *         description: [Resource] created successfully
//  *         content:
//  *           application/json:
//  *             schema:
//  *               type: object
//  *               properties:
//  *                 id:
//  *                   type: string
//  *                 name:
//  *                   type: string
//  *                 description:
//  *                   type: string
//  *                 createdAt:
//  *                   type: string
//  *                   format: date-time
//  *                 updatedAt:
//  *                   type: string
//  *                   format: date-time
//  *       400:
//  *         description: Bad request - Invalid input data
//  *       401:
//  *         description: Unauthorized
//  *       409:
//  *         description: Conflict - [Resource] already exists
//  *       500:
//  *         description: Internal server error
//  */
// // router.post("/", asyncHandler(controller.create));

// /**
//  * @swagger
//  * /api/[resources]/{id}:
//  *   get:
//  *     summary: Get a [resource] by ID
//  *     tags: [[RESOURCE_NAME]]
//  *     security:
//  *       - bearerAuth: []
//  *       - cookieAuth: []
//  *     parameters:
//  *       - in: path
//  *         name: id
//  *         required: true
//  *         schema:
//  *           type: string
//  *         description: [Resource] ID
//  *         example: "60d5ecb74b24c72b8c8b4567"
//  *     responses:
//  *       200:
//  *         description: [Resource] retrieved successfully
//  *         content:
//  *           application/json:
//  *             schema:
//  *               type: object
//  *               properties:
//  *                 id:
//  *                   type: string
//  *                 name:
//  *                   type: string
//  *                 description:
//  *                   type: string
//  *                 createdAt:
//  *                   type: string
//  *                   format: date-time
//  *                 updatedAt:
//  *                   type: string
//  *                   format: date-time
//  *       401:
//  *         description: Unauthorized
//  *       403:
//  *         description: Forbidden - Insufficient permissions
//  *       404:
//  *         description: [Resource] not found
//  *       500:
//  *         description: Internal server error
//  */
// // router.get("/:id", asyncHandler(controller.getById));

// /**
//  * @swagger
//  * /api/[resources]/{id}:
//  *   put:
//  *     summary: Update a [resource] by ID
//  *     tags: [[RESOURCE_NAME]]
//  *     security:
//  *       - bearerAuth: []
//  *       - cookieAuth: []
//  *     parameters:
//  *       - in: path
//  *         name: id
//  *         required: true
//  *         schema:
//  *           type: string
//  *         description: [Resource] ID
//  *         example: "60d5ecb74b24c72b8c8b4567"
//  *     requestBody:
//  *       required: true
//  *       content:
//  *         application/json:
//  *           schema:
//  *             type: object
//  *             properties:
//  *               name:
//  *                 type: string
//  *                 description: Name of the [resource]
//  *               description:
//  *                 type: string
//  *                 description: Description of the [resource]
//  *               // TODO: Add more updatable properties
//  *     responses:
//  *       200:
//  *         description: [Resource] updated successfully
//  *         content:
//  *           application/json:
//  *             schema:
//  *               type: object
//  *               properties:
//  *                 id:
//  *                   type: string
//  *                 name:
//  *                   type: string
//  *                 description:
//  *                   type: string
//  *                 updatedAt:
//  *                   type: string
//  *                   format: date-time
//  *       400:
//  *         description: Bad request - Invalid input data
//  *       401:
//  *         description: Unauthorized
//  *       403:
//  *         description: Forbidden - Insufficient permissions
//  *       404:
//  *         description: [Resource] not found
//  *       500:
//  *         description: Internal server error
//  */
// // router.put("/:id", asyncHandler(controller.updateById));

// /**
//  * @swagger
//  * /api/[resources]/{id}:
//  *   patch:
//  *     summary: Partially update a [resource] by ID
//  *     tags: [[RESOURCE_NAME]]
//  *     security:
//  *       - bearerAuth: []
//  *       - cookieAuth: []
//  *     parameters:
//  *       - in: path
//  *         name: id
//  *         required: true
//  *         schema:
//  *           type: string
//  *         description: [Resource] ID
//  *         example: "60d5ecb74b24c72b8c8b4567"
//  *     requestBody:
//  *       required: true
//  *       content:
//  *         application/json:
//  *           schema:
//  *             type: object
//  *             properties:
//  *               name:
//  *                 type: string
//  *                 description: Name of the [resource]
//  *               description:
//  *                 type: string
//  *                 description: Description of the [resource]
//  *               // TODO: Add more patchable properties
//  *     responses:
//  *       200:
//  *         description: [Resource] updated successfully
//  *         content:
//  *           application/json:
//  *             schema:
//  *               type: object
//  *               properties:
//  *                 id:
//  *                   type: string
//  *                 name:
//  *                   type: string
//  *                 description:
//  *                   type: string
//  *                 updatedAt:
//  *                   type: string
//  *                   format: date-time
//  *       400:
//  *         description: Bad request - Invalid input data
//  *       401:
//  *         description: Unauthorized
//  *       403:
//  *         description: Forbidden - Insufficient permissions
//  *       404:
//  *         description: [Resource] not found
//  *       500:
//  *         description: Internal server error
//  */
// // router.patch("/:id", asyncHandler(controller.updatePartialById));

// /**
//  * @swagger
//  * /api/[resources]/{id}:
//  *   delete:
//  *     summary: Delete a [resource] by ID
//  *     tags: [[RESOURCE_NAME]]
//  *     security:
//  *       - bearerAuth: []
//  *       - cookieAuth: []
//  *     parameters:
//  *       - in: path
//  *         name: id
//  *         required: true
//  *         schema:
//  *           type: string
//  *         description: [Resource] ID
//  *         example: "60d5ecb74b24c72b8c8b4567"
//  *     responses:
//  *       200:
//  *         description: [Resource] deleted successfully
//  *       401:
//  *         description: Unauthorized
//  *       403:
//  *         description: Forbidden - Insufficient permissions
//  *       404:
//  *         description: [Resource] not found
//  *       500:
//  *         description: Internal server error
//  */
// // router.delete("/:id", asyncHandler(controller.deleteById));

// // =====================================================================================
// // NESTED RESOURCE ROUTES (Uncomment and modify if you have nested resources)
// // =====================================================================================

// /**
//  * @swagger
//  * /api/[resources]/{id}/[nested-resource]:
//  *   get:
//  *     summary: Get [nested-resource] for a [resource]
//  *     tags: [[RESOURCE_NAME]]
//  *     security:
//  *       - bearerAuth: []
//  *       - cookieAuth: []
//  *     parameters:
//  *       - in: path
//  *         name: id
//  *         required: true
//  *         schema:
//  *           type: string
//  *         description: [Resource] ID
//  *     responses:
//  *       200:
//  *         description: [Nested-resource] retrieved successfully
//  *       401:
//  *         description: Unauthorized
//  *       404:
//  *         description: [Resource] or [nested-resource] not found
//  */
// // router.get("/:id/[nested-resource]", asyncHandler(controller.getNestedResource));

// /**
//  * @swagger
//  * /api/[resources]/{id}/[nested-resource]:
//  *   post:
//  *     summary: Add [nested-resource] to a [resource]
//  *     tags: [[RESOURCE_NAME]]
//  *     security:
//  *       - bearerAuth: []
//  *       - cookieAuth: []
//  *     parameters:
//  *       - in: path
//  *         name: id
//  *         required: true
//  *         schema:
//  *           type: string
//  *         description: [Resource] ID
//  *     requestBody:
//  *       required: true
//  *       content:
//  *         application/json:
//  *           schema:
//  *             type: object
//  *             // TODO: Define nested resource schema
//  *     responses:
//  *       201:
//  *         description: [Nested-resource] added successfully
//  *       400:
//  *         description: Bad request
//  *       401:
//  *         description: Unauthorized
//  *       404:
//  *         description: [Resource] not found
//  */
// // router.post("/:id/[nested-resource]", asyncHandler(controller.addNestedResource));

// // =====================================================================================
// // BULK OPERATIONS (Uncomment if you need bulk operations)
// // =====================================================================================

// /**
//  * @swagger
//  * /api/[resources]/bulk:
//  *   post:
//  *     summary: Bulk create [resources]
//  *     tags: [[RESOURCE_NAME]]
//  *     security:
//  *       - bearerAuth: []
//  *       - cookieAuth: []
//  *     requestBody:
//  *       required: true
//  *       content:
//  *         application/json:
//  *           schema:
//  *             type: object
//  *             required:
//  *               - items
//  *             properties:
//  *               items:
//  *                 type: array
//  *                 items:
//  *                   type: object
//  *                   // TODO: Define item schema
//  *                 minItems: 1
//  *                 maxItems: 100
//  *     responses:
//  *       201:
//  *         description: [Resources] created successfully
//  *       400:
//  *         description: Bad request - Invalid input data
//  *       401:
//  *         description: Unauthorized
//  */
// // router.post("/bulk", asyncHandler(controller.bulkCreate));

// /**
//  * @swagger
//  * /api/[resources]/bulk-delete:
//  *   delete:
//  *     summary: Bulk delete [resources]
//  *     tags: [[RESOURCE_NAME]]
//  *     security:
//  *       - bearerAuth: []
//  *       - cookieAuth: []
//  *     requestBody:
//  *       required: true
//  *       content:
//  *         application/json:
//  *           schema:
//  *             type: object
//  *             required:
//  *               - ids
//  *             properties:
//  *               ids:
//  *                 type: array
//  *                 items:
//  *                   type: string
//  *                 minItems: 1
//  *                 maxItems: 100
//  *                 description: Array of [resource] IDs to delete
//  *     responses:
//  *       200:
//  *         description: [Resources] deleted successfully
//  *       400:
//  *         description: Bad request - Invalid IDs
//  *       401:
//  *         description: Unauthorized
//  *       404:
//  *         description: Some [resources] not found
//  */
// // router.delete("/bulk-delete", asyncHandler(controller.bulkDelete));

// // =====================================================================================
// // SEARCH AND FILTER ROUTES (Uncomment if you need advanced search)
// // =====================================================================================

// /**
//  * @swagger
//  * /api/[resources]/search:
//  *   get:
//  *     summary: Search [resources] with advanced filters
//  *     tags: [[RESOURCE_NAME]]
//  *     security:
//  *       - bearerAuth: []
//  *       - cookieAuth: []
//  *     parameters:
//  *       - in: query
//  *         name: q
//  *         schema:
//  *           type: string
//  *         description: Search query
//  *       - in: query
//  *         name: filters
//  *         schema:
//  *           type: string
//  *         description: JSON string of filters (e.g., {"status":"active","category":"tech"})
//  *       - in: query
//  *         name: page
//  *         schema:
//  *           type: integer
//  *           default: 1
//  *       - in: query
//  *         name: limit
//  *         schema:
//  *           type: integer
//  *           default: 10
//  *     responses:
//  *       200:
//  *         description: Search results retrieved successfully
//  *       400:
//  *         description: Bad request - Invalid search parameters
//  *       401:
//  *         description: Unauthorized
//  */
// // router.get("/search", asyncHandler(controller.search));

// // =====================================================================================
// // EXPORT/IMPORT ROUTES (Uncomment if you need data export/import)
// // =====================================================================================

// /**
//  * @swagger
//  * /api/[resources]/export:
//  *   get:
//  *     summary: Export [resources] data
//  *     tags: [[RESOURCE_NAME]]
//  *     security:
//  *       - bearerAuth: []
//  *       - cookieAuth: []
//  *     parameters:
//  *       - in: query
//  *         name: format
//  *         schema:
//  *           type: string
//  *           enum: [csv, json, xml]
//  *           default: csv
//  *         description: Export format
//  *       - in: query
//  *         name: filters
//  *         schema:
//  *           type: string
//  *         description: JSON string of filters to apply
//  *     responses:
//  *       200:
//  *         description: Data exported successfully
//  *         content:
//  *           application/octet-stream:
//  *             schema:
//  *               type: string
//  *               format: binary
//  *       400:
//  *         description: Bad request - Invalid export parameters
//  *       401:
//  *         description: Unauthorized
//  */
// // router.get("/export", asyncHandler(controller.export));

// // =====================================================================================
// // STATISTICS/ANALYTICS ROUTES (Uncomment if you need stats)
// // =====================================================================================

// /**
//  * @swagger
//  * /api/[resources]/stats:
//  *   get:
//  *     summary: Get [resources] statistics
//  *     tags: [[RESOURCE_NAME]]
//  *     security:
//  *       - bearerAuth: []
//  *       - cookieAuth: []
//  *     responses:
//  *       200:
//  *         description: Statistics retrieved successfully
//  *         content:
//  *           application/json:
//  *             schema:
//  *               type: object
//  *               properties:
//  *                 total:
//  *                   type: integer
//  *                 active:
//  *                   type: integer
//  *                 // TODO: Add more statistics fields
//  *       401:
//  *         description: Unauthorized
//  *       500:
//  *         description: Internal server error
//  */
// // router.get("/stats", asyncHandler(controller.getStats));

// // =====================================================================================
// // ADDITIONAL MIDDLEWARE EXAMPLES (Uncomment as needed)
// // =====================================================================================

// // Rate limiting example
// // router.use(rateLimit({ windowMs: 15 * 60 * 1000, max: 100 })); // 100 requests per 15 minutes

// // Validation middleware example (if you have it)
// // router.post("/", validateRequest(createResourceSchema), asyncHandler(controller.create));

// // Custom middleware example
// // router.use(customLoggingMiddleware);

// // File upload example (if you need file uploads)
// // import multer from "multer";
// // const upload = multer({ dest: "uploads/" });
// // router.post("/upload", upload.single("file"), asyncHandler(controller.uploadFile));

// export default router;

// /*
// USAGE INSTRUCTIONS:

// 1. Copy this file: cp _example.js yourResourceRoutes.js
// 2. Update the file header comment with your resource name
// 3. Update the controller import path
// 4. Uncomment the routes you need
// 5. Update Swagger documentation:
//    - Replace [RESOURCE_NAME] with your resource name (e.g., Products)
//    - Replace [resource] with lowercase plural (e.g., products)
//    - Update request/response schemas to match your data model
//    - Add proper validation rules
// 6. Update controller method names to match your actual controller
// 7. Add any additional middleware as needed
// 8. Test the routes thoroughly

// COMMON MIDDLEWARE TO CONSIDER:
// - AuthGuard: For routes requiring authentication
// - adminGaurd: For admin-only operations
// - memberGaurd: For member-only operations
// - validateRequest: For input validation
// - rateLimit: For rate limiting
// - upload: For file uploads

// ERROR HANDLING:
// - All routes use asyncHandler to catch async errors
// - Controller methods should throw appropriate HTTP errors
// - Error responses are automatically formatted by error middleware

// NAMING CONVENTIONS:
// - Route files: [Resource]Routes.js (e.g., ProductRoutes.js)
// - Controller files: [Resource]Controller.js (e.g., ProductController.js)
// - Service files: [resource]Service.js (e.g., productService.js)
// */
