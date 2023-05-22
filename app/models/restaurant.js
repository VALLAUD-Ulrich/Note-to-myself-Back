const client = require('../db/pg'); // import the client
const moment = require('moment'); // require

/**
 * @typedef Restaurant
 * @property {string} name.required
 * @property {string} slug.required
 * @property {string} photo_url.required
 * @property {string} location.required
 * @property {string} coordinate.required
 * @property {boolean} favorite.required
 * @property {string} comment.required
 * @property {integer} user_id.required
 */
class Restaurant {
  constructor(obj) {
    this.id = obj.id;
    this.name = obj.name;
    this.slug = obj.slug;
    this.photo_url = obj.photo_url;
    this.coordinate = obj.coordinate;
    this.location = obj.location;
    this.favorite = obj.favorite;
    this.comment = obj.comment;
    this.user_id = obj.user_id;
  }

  /**
   * @param {*} req
   * @param {*} res
   * @returns
   */

  static async getAll(req, res) {
    const query =
    `select restaurant.*,
    ARRAY((SELECT row_to_json(_) FROM (SELECT tag_restaurant.id, tag_restaurant.label
    FROM tag_restaurant WHERE tag_restaurant_id = restaurant.id) AS _ )) AS Tags
    from restaurant where user_id = $1
    GROUP BY restaurant.id`; // query to get all restaurant

    const values = [req.headers.userid];

    try {
      const result = await client.query(query, values);
      res.json(result.rows);
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: err.message });
    }
  }

  /**
 *
 * @param {*} req
 * @param {*} res
 */
  static async getOne(req, res) {
    const query = `select restaurant.*,
    ARRAY((SELECT row_to_json(_) FROM (SELECT tag_restaurant.id, tag_restaurant.label
    FROM tag_restaurant WHERE tag_restaurant_id = restaurant.id) AS _ )) AS Tags,
    ARRAY((SELECT row_to_json(_) FROM (SELECT meal.id, meal.name, meal.slug, meal.photo_url,
    meal.favorite, meal.review ,meal.meal_restaurant_id, to_char(meal.created_at,'dd/MM/YYYY HH24:MI:SS') AS created_at,
    to_char(meal.updated_at,'dd/MM/YYYY HH24:MI:SS') AS updated_at,
    (select (ARRAY((SELECT row_to_json(_) FROM (SELECT tag_meal.id, tag_meal.label
      FROM tag_meal WHERE tag_meal_id = meal.id) AS _ )))) as Tags
    FROM meal WHERE meal.meal_restaurant_id = $1) _)) AS meal, 
    ARRAY((SELECT row_to_json(_) FROM (SELECT memento.id, memento.name, memento.content, memento.reminder,
    memento.memento_restaurant_id, to_char(memento.created_at,'dd/MM/YYYY HH24:MI:SS') AS created_at,
    to_char(memento.updated_at,'dd/MM/YYYY HH24:MI:SS') AS updated_at FROM memento WHERE memento_restaurant_id = restaurant.id) AS _ )) AS Memento
    FROM restaurant
    WHERE restaurant.id = $1
    GROUP BY restaurant.id`;

    const values = [req.headers.restaurantid];

    try {
      const result = await client.query(query, values);
      // boucler sur les résultats pour récupérer les tags
      res.json(result.rows);
      console.log(result.rows);
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: err.message });
    }
  }

  /**
 *
 * @param {*} req
 * @param {*} res
 */
  static async create(req, res) {
    const query =
      'INSERT INTO public.restaurant (name, slug, location, coordinate, photo_url, favorite , comment, user_id) VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *';
    const values = [
      req.body.name,
      req.body.slug,
      req.body.location,
      req.body.coordinate,
      req.body.photo_url,
      req.body.favorite,
      req.body.comment,
      req.headers.userid,
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
 *
 * @param {*} req
 * @param {*} res
 */
  static async update(req, res) {
    const allowed = [
      'name',
      'slug',
      'location',
      'coordinate',
      'photo_url',
      'favorite',
      'comment',
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
      `UPDATE public.restaurant SET ${setStr} updated_at =$1 WHERE id=$2 RETURNING *`;
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
 *
 * @param {*} req
 * @param {*} res
 */
  static async delete(req, res) {
    const query = 'DELETE FROM public.restaurant WHERE id=$1';
    const values = [req.headers.id];

    try {
      const result = await client.query(query, values);
      res.json({ result: result.rows[0], message: 'Restaurant deleted' });
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: err.message });
    }
  }
}
module.exports = Restaurant;
