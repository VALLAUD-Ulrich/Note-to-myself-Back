const Restaurant = require('../models/restaurant');
const controllerRestaurant = {
  // Method: GET
  // Path: /restaurants
  // Description: Get all restaurants
  restaurants: (req, res) => {
    try {
      Restaurant.getAll(req, res);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: error.message });
    }
  },

  // Method: GET
  // Path: /restaurants/:id
  // Description: Get one restaurant
  restaurant: (req, res) => {
    try {
      Restaurant.getOne(req, res);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: error.message });
    }
  },

  // Method: POST
  // Path: /restaurants
  // Description: Create a restaurant
  createRestaurant: (req, res) => {
    try {
      Restaurant.create(req, res);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: error.message });
    }
  },

  // Method: PATCH
  // Path: /restaurant
  // Description: Update a restaurant
  updateRestaurant: (req, res) => {
    try {
      Restaurant.update(req, res);
      // Tag.createTagMeal(req,res);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: error.message });
    }
  },

  // Method: DELETE
  // Path: /restaurant
  // Description: Delete a restaurant
  deleteRestaurant: (req, res) => {
    try {
      Restaurant.delete(req, res);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: error.message });
    }
  },
};

module.exports = controllerRestaurant;
