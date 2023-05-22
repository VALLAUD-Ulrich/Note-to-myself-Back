const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/authMiddleware');
const controllerMeal = require('../controllers/controllerMeal');

/**
 * POST /meal
 * @summary récupère les plats d'un restaurant
 * @tags MEAL
 * @return {object} 200 - success response - application/json
 * @return {Error}  default - Unexpected error
 * @example response - 200 - success response
 * {
 * "id": 1,
 * "name": "steack poulet",
 * "slug" : "steack-poulet",
 * "photo_url": "https://www.steak-poulet.fr/wp-content/uploads/2019/03/le-petit-bouchon-restaurant-lyon-1.jpg",
 * "restaurant_id" : 1,
 * "tags" : [
 * {
 * "id": 1,
 * "name": "viande"
 * },
 * {
 * "id": 2,
 * "name": "poulet"
 * }
 * ]
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

/** PATCH /meal
 * @summary modifie un plat
 * @tags MEAL
 * @return {object} 200 - success response - application/json
 * @return {Error}  default - Unexpected error
 * @example response - 200 - success response
 * {
 * "id": 1,
 * "name": "steack poulet",
 * "slug" : "steack-poulet",
 * "photo_url": "https://www.steak-poulet.fr/wp-content/uploads/2019/03/le-petit-bouchon-restaurant-lyon-1.jpg",
 * "restaurant_id" : 1,
 * "tags" : [
 * {
 * "id": 1,
 * "name": "viande"
 * },
 * {
 * "id": 2,
 * "name": "poulet"
 * }
 * ]
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

/** DELETE /meal
 * @summary supprime un plat
 * @tags MEAL
 * @return {object} 200 - success response - application/json
 * @return {Error}  default - Unexpected error
 * @example response - 200 - success response
 * {
 * "message": "Le plat a bien été supprimé"
 * }
 * @example response - 400 - Bad request
 * {
 * @example response - 401 - Unauthorized
 * {
 * "error": "Unauthorized"
 * }
 * @example response - 500 - Internal server error
 * {
 * "error": "Internal server error"
 * }
 */

// Router for meal
router.post('/meal', authMiddleware.checkToken, controllerMeal.createMeal);
router.patch('/meal', authMiddleware.checkToken, controllerMeal.updateMeal);
router.delete('/meal', authMiddleware.checkToken, controllerMeal.deleteMeal);

module.exports = router;
