const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/authMiddleware');
const controllerUser = require('../controllers/controllerUser');

/**
 * POST /signup
 * @summary Create a new user
 * @security basicAuth
 * @tags USER
 * @return {newUser} 200 - User created
 * @return {Error} 401 - Unauthorized
 * @example response - 200 - response
 * {
 *  "username": "Rick",
 *  "email": "rick@mail.com"
 * }
 * @example response - 500 - internal server error
 * {
 *  "error": "Cette adresse mail déjà utilisée"
 * }
 *  @example response - 400 - Bad request
 * {
 * "error": "Bad request"
 * }
 * @example response - 500 - Internal server error
 * {
 * "error": "Internal server error"
 * }
 */

/** POST /login
 * @summary Login a user
 * @tags USER
 * @return {object} 200 - User logged in
 * @return {Error} 401 - Unauthorized
 * @example response - 200 - response
 * {
 *  "username": "Rick",
 *  "email": "rick@mail.com"
 * }
 * @example response - 401 - Unauthorized
 * {
 *  "error": "email ou mot de passe incorrect"
 * }
 * @example response - 500 - internal server error
 * {
 *  "error": "Cette adresse mail déjà utilisée"
 * }
 *  @example response - 400 - Bad request
 * {
 * "error": "Bad request"
 * }
 * @example response - 500 - Internal server error
 * {
 * "error": "Internal server error"
 */

/** PATCH /user
 * @summary Update a user
 * @tags USER
 * @return {object} 200 - User updated
 * @return {Error}  default - Unexpected error
 * @example response - 200 - response
 * {
 * "username": "Rick",
 * "email": "Ickr@mail.com"
 * }
 * @example response - 401 - Unauthorized
 * {
 * "error": "email ou mot de passe incorrect"
 * }
 * @example response - 500 - internal server error
 * {
 *  "error": "Cette adresse mail déjà utilisée"
 * }
 *  @example response - 400 - Bad request
 * {
 * "error": "Bad request"
 * }
 * @example response - 500 - Internal server error
 * {
 * "error": "Internal server error"
 * }
 *
 */

/** DELETE /user
 * @summary Delete a user
 * @tags USER
 * @return {object} 200 - User deleted
 * @return {Error}  default - Unexpected error
 * @example response - 200 - response
 * {
 * "message": "Utilisateur supprimé"
 * }
 * @example response - 401 - Unauthorized
 * {
 * "error": "suppression impossible"
 * }
 * @example response - 500 - internal server error
 * {
 *  "error": "Cette adresse mail déjà utilisée"
 * }
 *  @example response - 400 - Bad request
 * {
 * "error": "Bad request"
 * }
 * @example response - 500 - Internal server error
 * {
 * "error": "Internal server error"
 * }
 */

// Router for user
router.post('/signup', controllerUser.doSignUp);
router.post('/login', controllerUser.doLogin);
router.patch('/user', authMiddleware.checkToken, controllerUser.updateUser);
router.delete('/user', authMiddleware.checkToken, controllerUser.deleteUser);

module.exports = router;
