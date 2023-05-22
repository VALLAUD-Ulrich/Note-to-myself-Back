const client = require('../db/pg');
const moment = require('moment'); // require

/**
 * @typedef Memento
 * @property {string} name.required
 * @property {string} content.required
 * @property {string} reminder.required
 * @property {string} memento_restaurant_id.required
 */
class Memento {
  constructor(obj) {
    this.id = obj.id;
    this.name = obj.name;
    this.content = obj.content;
    this.reminder = obj.reminder;
    this.memento_restaurant_id = obj.meal_restaurant_id;
  }

  /**
  * @param {*} req
  * @param {*} res
  */
  static async create(req, res) {
    const query = 'INSERT INTO memento (name, content, reminder, memento_restaurant_id) VALUES ($1, $2, $3, $4) RETURNING *'; // query to create a memento
    const values = [
      req.body.name,
      req.body.content,
      req.body.reminder,
      req.body.memento_restaurant_id,
    ];
    try {
      const result = await client.query(query, values);
      res.json(result.rows[0]);
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: err.message });
    }
  }

  /**
  * @param {*} req
  * @param {*} res
  */
  static async update(req, res) {
    const allowed = [
      'name',
      'content',
      'reminder',
      'memento_restaurant_id',
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
      `UPDATE public.memento SET ${setStr} updated_at = $1 WHERE id=$2 RETURNING *`;
    const values = [date, req.headers.id];
    try {
      const result = await client.query(query, values);
      res.json(result.rows[0]);
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: err.message });
    }
  }

  /**
  * @param {*} req
  * @param {*} res
  */
  static async delete(req, res) {
    const query = 'DELETE FROM public.memento WHERE id = $1'; // query to delete a memento
    const values = [req.headers.id];

    try {
      const result = await client.query(query, values);
      res.json({ result: result.rows[0], message: 'memento deleted' });
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: err.message });
    }
  }
}

module.exports = Memento;
