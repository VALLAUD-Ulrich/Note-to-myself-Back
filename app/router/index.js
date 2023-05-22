const express = require('express');
const router = express.Router();

const routerUser = require('./routerUser.js');
const routerRestaurant = require('./routerRestaurant.js');
const routerMeal = require('./routerMeal.js');
const routerMemento = require('./routerMemento.js');
const routerTagsRestaurant = require('./routerTagsRestaurant.js');
const routerTagsMeal = require('./routerTagsMeal.js');
const routerUpload = require('./routerUpload.js');

// Router for user
router.use(routerUser);

// Router for restaurant
router.use(routerRestaurant);

// Router for meal
router.use(routerMeal);

// Router for memento
router.use(routerMemento);

// Router for meals tags
router.use(routerTagsMeal);

// Router for restaurant tags
router.use(routerTagsRestaurant);

// Router for upload
router.use(routerUpload);

module.exports = router;
