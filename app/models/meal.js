const client = require('../db/pg');
const moment = require('moment'); // require

/**
 * @typedef Meal
 * @property {integer} id.required
 * @property {string} name.required
 * @property {string} slug.required
 * @property {boolean} favorite.required
 * @property {integer} meal_restaurant_id.required
 */
class Meal {
  constructor(obj) {
    this.id = obj.id;
    this.name = obj.name;
    this.slug = obj.slug;
    this.favorite = obj.favorite;
    this.meal_restaurant_id = obj.meal_restaurant_id;
  }
  static async create(req, res) {
    const query = 'INSERT INTO meal (name, slug, photo_url, favorite, review, meal_restaurant_id) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *'; // query to create a memento
    const values = [
      req.body.name,
      req.body.slug,
      req.body.photo_url,
      req.body.favorite,
      req.body.review,
      req.body.meal_restaurant_id,
    ];
    try {
      const result = await client.query(query, values);
      res.json(result.rows[0]);
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: err.message });
    }
  }

  // Method: PATCH
  // Path: /meal
  // Description: Update a meal
  static async update(req, res) {
    const allowed = [
      'name',
      'slug',
      'photo_url',
      'favorite',
      'review',
      'meal_restaurant_id'
    ];
    let params = [];
    let setStr = '';
    let date = moment().format('MM/DD/YYYY HH:mm:ss');
    for(var key in req.body) {
      if (allowed.some((allowedKey) => allowedKey === key)) {
        setStr += `${key} = '${req.body[key]}',`;
        params.push[key];
      }
    }
    const query =
    `UPDATE public.meal SET ${setStr} updated_at=$1 WHERE id=$2 RETURNING *`;
    const values = [date, req.headers.id];
    try {
      const result = await client.query(query, values);
      res.json(result.rows[0]);
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: err.message });
    }
  }
  // Method: DELETE
  // Path: /meal
  // Description: Delete a meal

  static async delete(req, res) {
    const query = 'DELETE FROM public.meal WHERE id = $1'; // query to delete a meal
    const values = [req.headers.id];

    try {
      const result = await client.query(query, values);
      res.json({ result: result.rows[0], message: 'Meal deleted' });
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: err.message });
    }
  }
}

module.exports = Meal;
