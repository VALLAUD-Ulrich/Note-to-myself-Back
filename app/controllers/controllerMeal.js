const Meal = require('../models/meal');

const controllerMeal = {
  // Method: POST
  // Path: /meal
  // Description: Create a meal
  createMeal: (req, res) => {
    try {
      Meal.create(req, res);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: error.message });
    }
  },

  // Method: PATCH
  // Path: /meal
  // Description: Update a meal
  updateMeal: (req, res) => {
    try {
      Meal.update(req, res);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: error.message });
    }
  },

  // Method: DELETE
  // Path: /meal
  // Description: Delete a meal
  deleteMeal: (req, res) => {
    try {
      Meal.delete(req, res);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: error.message });
    }
  },
};

module.exports = controllerMeal;
