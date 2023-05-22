const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/authMiddleware');
const controllerRestaurant = require('../controllers/controllerRestaurant');

/** GET /restaurants
 * @summary récupère les restaurants
 * @tags RESTAURANT
 * @return {newRestaurant} 200 - success response - application/json
 * @return {Error}  default - Unexpected error
 * @example response - 200 - success response
 * [
 * {
 * "id": 1,
 * "name": "Le petit bouchon",
 * "slug" : "le-petit-bouchon",
 * "photo_url": "https://www.lepetitbouchon.fr/wp-content/uploads/2019/03/le-petit-bouchon-restaurant-lyon-1.jpg",
 * "location": "1 rue de la paix",
 * "coordinate" : "48.856614, 2.3522219",
 * "favorite" : true,
 * "comment" : "un bon restaurant",
 * "user_id" : 1,
 * "tags" : [
 * {
 * "id": 1,
 * "name": "français"
 * },
 * {
 * "id": 2,
 * "name": "traditionnel"
 * }
 * ]
 * }
 * ]
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

/** GET /restaurant
 * @summary récupère un restaurant
 * @tags RESTAURANT
 * @return {object} 200 - success response - application/json
 * @return {Error}  default - Unexpected error
 * @example response - 200 - success response
 * {
 * "id": 1,
 * "name": "Le petit bouchon",
 * "slug" : "le-petit-bouchon",
 * "photo_url": "https://www.lepetitbouchon.fr/wp-content/uploads/2019/03/le-petit-bouchon-restaurant-lyon-1.jpg",
 * "location": "1 rue de la paix",
 * "coordinate" : "48.856614, 2.3522219",
 * "favorite" : true,
 * "comment" : "un bon restaurant",
 * "user_id" : 1,
 * "meal" :
 * [
 * {
 * "id": 1,
 * "name": "steack poulet",
 * "slug" : "steack-poulet",
 * "photo_url": "https://www.steak-poulet.fr/wp-content/uploads/2019/03/le-petit-bouchon-restaurant-lyon-1.jpg",
 * "favorite" : true,
 * "meal_restaurant_id" : 1
 * }
 * ],
 * "tags" : [
 * {
 * "id": 1,
 * "name": "italien"
 * },
 * {
 * "id": 2,
 * "name": "français"
 * }
 * ]
 * }
 * @example response - 400 - Bad request
 * {
 * "error": "Bad request"
 * }
 * @response 401 - Unauthorized
 * {
 * "error": "Unauthorized"
 * }
 * @response 500 - Internal server error
 * {
 * "error": "Internal server error"
 * }
 *
 */

/** POST /restaurant
 * @summary crée un restaurant
 * @tags RESTAURANT
 * @return {object} 200 - success response - application/json
 * @return {Error}  default - Unexpected error
 *
 * @example response - 200 - success response
 * {
 * "id": 1,
 * "name": "Le petit bouchon",
 * "slug" : "le-petit-bouchon",
 * "photo_url": "https://www.lepetitbouchon.fr/wp-content/uploads/2019/03/le-petit-bouchon-restaurant-lyon-1.jpg",
 * "location": "1 rue de la paix",
 * "coordinate" : "48.856614, 2.3522219",
 * "favorite" : true,
 * "comment" : "un bon restaurant",
 * "user_id" : 1
 * }
 * @example response - 400 - Bad request
 * {
 * "error": "Bad request"
 * }
 * @response 401 - Unauthorized
 * {
 * "error": "Unauthorized"
 * }
 * @response 500 - Internal server error
 * {
 * "error": "Internal server error"
 * }
 *
 */

/** PATCH /restaurant
 * @summary modifie un restaurant
 * @tags RESTAURANT
 * @return {object} 200 - success response - application/json
 * @return {Error}  default - Unexpected error
 *
 * @example response - 200 - success response
 * {
 * "id": 1,
 * "name": "Le petit bouchon",
 * "slug" : "le-petit-bouchon",
 * "photo_url": "https://www.lepetitbouchon.fr/wp-content/uploads/2019/03/le-petit-bouchon-restaurant-lyon-1.jpg",
 * "location": "1 rue de la paix",
 * "coordinate" : "48.856614, 2.3522219",
 * "favorite" : true,
 * "comment" : "un bon restaurant"
 * }
 * @example response - 400 - Bad request
 * {
 * "error": "Bad request"
 * }
 * @response 401 - Unauthorized
 * {
 * "error": "Unauthorized"
 * }
 * @response 500 - Internal server error
 * {
 * "error": "Internal server error"
 * }
 *
 */

/** DELETE /restaurant
 * @summary supprime un restaurant
 * @tags RESTAURANT
 * @return {object} 200 - success response - application/json
 * @return {Error}  default - Unexpected error
 * @example response - 200 - success response
 * {
 * "message": "Restaurant supprimé"
 * }
 * @example response - 400 - Bad request
 * {
 * "error": "Bad request"
 * }
 * @response 401 - Unauthorized
 * {
 * "error": "Unauthorized"
 * }
 * @response 500 - Internal server error
 * {
 * "error": "Internal server error"
 * }
 *
 */

router.get(
  '/restaurants',
  authMiddleware.checkToken,
  controllerRestaurant.restaurants
);
router.get(
  '/restaurant',
  authMiddleware.checkToken,
  controllerRestaurant.restaurant
);
router.post(
  '/restaurant',
  authMiddleware.checkToken,
  controllerRestaurant.createRestaurant
);
router.patch(
  '/restaurant',
  authMiddleware.checkToken,
  controllerRestaurant.updateRestaurant
);
router.delete(
  '/restaurant',
  authMiddleware.checkToken,
  controllerRestaurant.deleteRestaurant
);

module.exports = router;
