const client = require('../db/pg');

/**
 * @typedef Tag
 * @property {string} label.required
 */

class Tag {
  constructor(obj) {
    this.id = obj.id;
    this.label = obj.label;
  }

  // Method: GET
  // Path: /tag
  // Get all tags

  /**
  * @param {*} req
  * @param {*} res
  * @returns
  */
  static async suggestTags(req, res) {

    const restaurantOrMeal = req.headers.type === 'restaurant' ? 'suggested_tag_restaurant' : 'suggested_tag_meal';
    const query = `SELECT * FROM ${restaurantOrMeal}`;
    try {
      const result = await client.query(query);
      res.json(result.rows);
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: err.message });
    }
  }

  // Method: PATCH
  // Path: /tag
  // Replace tags for a meal / restaurant

  /**
  * @param {*} req
  * @param {*} res
  * @returns
  */
  static async setTags(req, res) {
    const restaurantOrMeal = req.headers.type === 'restaurant' ? 'tag_restaurant' : 'tag_meal';
    const deleteQuery = `DELETE FROM ${restaurantOrMeal} WHERE ${restaurantOrMeal}_id = $1`;
    const deleteValues = [req.headers.id];
    try {
      await client.query(deleteQuery, deleteValues);
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: err.message });
    }
    if(req.body.tags.length === 0){
      res.json('Tags deleted and no new one added');
    } else {
      let setStr = '';
      req.body.tags.forEach( tag => setStr += `('${tag.label}', '${req.headers.id}'),`);
      let setStrSliced = setStr.slice(0, -1);
      const createQuery = `INSERT INTO ${restaurantOrMeal} (label, ${restaurantOrMeal}_id) VALUES ${setStrSliced} RETURNING *`;
      try {
        const result = await client.query(createQuery);
        res.json(result.rows[0]);
      } catch (err) {
        console.error(err);
        res.status(500).json({ message: err.message });
      }
    }
  }
}
module.exports = Tag;
