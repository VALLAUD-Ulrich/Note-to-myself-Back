const Memento = require('../models/memento');

const controllerMemento = {
  // Method: POST
  // Path: /memento
  // Description: Create a memento
  createMemento: (req, res) => {
    try {
      Memento.create(req, res);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: error.message });
    }
  },

  // Method: PATCH
  // Path: /memento
  // Description: Update a memento
  updateMemento: (req, res) => {
    try {
      Memento.update(req, res);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: error.message });
    }
  },

  // Method: DELETE
  // Path: /memento
  // Description: Delete a memento
  deleteMemento: (req, res) => {
    try {
      Memento.delete(req, res);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: error.message });
    }
  },
};

module.exports = controllerMemento;
