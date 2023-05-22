const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/authMiddleware');
const controllerUpload = require('../controllers/controllerUpload');

/**
 * POST /upload
 * @summary Upload a file
 * @tags UPLOAD
 * @return {object} 200 - File uploaded
 * @return {Error}  default - Unexpected error
 * @example response - 200 - response
 * {
 * "message": "File uploaded"
 * }
 * @example response - 400 - Bad request
 * {
 * "error": "Bad request"
 * }
 * @example response - 500 - Internal server error
 * {
 * "error": "Internal server error"
 * }
 *
 * @example response - 401 - Unauthorized
 * {
 * "error": "echec de l'upload"
 * }
 *
 */
router.post('/upload', authMiddleware.checkToken, controllerUpload.uploadImage);

module.exports = router;
