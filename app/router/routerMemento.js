const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/authMiddleware');
const controllerMemento = require('../controllers/controllerMemento');

/** POST /memento
 * @summary récupère les memento d'un restaurant
 * @tags MEMENTO
 * @return {object} 200 - success response - application/json
 * @return {Error}  default - Unexpected error
 * @example response - 200 - response
 * {
 * "id": 1,
 * "name": "Memento 1",
 * "content": "Contenu du memento 1"
 * }
 * @example response - 400 - Bad request
 * {
 * "error": "Bad request"
 * }
 * @example response - 401 - Unauthorized
 * {
 * "error": "Unauthorized"
 * }
 * @example response - 500 - Internal server error
 * {
 * "error": "Internal server error"
 * }
 *
 */

/** PATCH /memento
 * @summary modifie un memento
 * @tags MEMENTO
 * @return {object} 200 - success response - application/json
 * @return {Error}  default - Unexpected error
 * @example response - 200 - response
 * {
 * "message": "Memento modifié"
 * }
 * @example response - 400 - Bad request
 * {
 * "error": "Bad request"
 * }
 * @example response - 401 - Unauthorized
 * {
 * "error": "Unauthorized"
 * }
 * @example response - 500 - Internal server error
 * {
 * "error": "Internal server error"
 * }
 */

/** DELETE /memento
 * @summary supprime un memento
 * @tags MEMENTO
 * @return {object} 200 - success response - application/json
 * @return {Error}  default - Unexpected error
 * @example response - 200 - response
 * {
 * "message": "Memento supprimé"
 * }
 * @example response - 400 - Bad request
 * {
 * "error": "Bad request"
 * }
 * @example response - 401 - Unauthorized
 * {
 * "error": "Unauthorized"
 * }
 * @example response - 500 - Internal server error
 * {
 * "error": "Internal server error"
 * }
 */

router.post(
  '/memento',
  authMiddleware.checkToken,
  controllerMemento.createMemento
);
router.patch(
  '/memento',
  authMiddleware.checkToken,
  controllerMemento.updateMemento
);
router.delete(
  '/memento',
  authMiddleware.checkToken,
  controllerMemento.deleteMemento
);

module.exports = router;
