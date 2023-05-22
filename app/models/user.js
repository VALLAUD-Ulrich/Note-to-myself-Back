const client = require('../db/pg'); // import the client
const bcrypt = require('bcrypt'); // import bcrypt

/**
 * @typedef User
 * @property {string} username.required
 * @property {string} password.required
 * @property {string} email.required
 * @property {boolean} dark.required
 * @property {string} photo_url.required
 */
class User {
  constructor(obj) {
    this.id = obj.id;
    this.username = obj.username;
    this.password = obj.password;
    this.email = obj.email;
    this.dark = obj.dark;
    this.photo_url = obj.photo_url;
  }

  /**
   * @param {string} username
   * @param {string} password
   * @param {string} email
   * @returns
   */
  //create username and password
  static async create(username, password, email) {
    const passwordcrypt = await bcrypt.hash(password, 10);
    const result = await client.query(
      'INSERT INTO public.user (username, password, email) VALUES ($1, $2, $3) RETURNING *',
      [username, passwordcrypt, email]
    );
    const user = new User(result.rows[0]);
    return user;
  }

  /**
   *
   * @param {string} email
   * @returns
   */
  static async findUserByEmail(email) {
    const result = await client.query(
      'SELECT * FROM public.user WHERE email=$1',
      [email]
    );
    if (result.rows.length > 0) {
      return new User(result.rows[0]);
    } else {
      return null;
    }
  }

  /**
   *
   * @param {*} id
   * @returns
   */
  static async findUserById(id) {
    const result = await client.query('SELECT * FROM public.user WHERE id=$1', [
      id,
    ]);
    if (result.rows.length > 0) {
      return new User(result.rows[0]);
    } else {
      return null;
    }
  }

  /**
   *
   * @param {*} req
   * @param {*} res
   */
  static async delete(req, res) {
    const query = 'DELETE FROM public.user WHERE id=$1';
    const values = [req.headers.userid];
    try {
      await client.query(query, values);
      res.json({ message: 'User deleted' });
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: err.message });
    }
  }

  /**
   *
   * @param {*} req
   * @param {*} res
   * @returns
   */
  static async update(req, res) {
    const allowed = [
      'username',
      'password',
      'dark',
      'photo_url',
    ];
    let setStr = '';
    for(var key in req.body) {
      if (allowed.some((allowedKey) => allowedKey === key)) {
        if(key === 'password') {
          if (req.body.password){
            let cryptedPassword = await bcrypt.hash(req.body.password, 10);
            setStr += `password = '${cryptedPassword}',`;
          }
        } else
          setStr += `${key} = '${req.body[key]}',`;
      }
    }

    let setStrSliced = setStr.slice(0, -1);
    const query =
      `UPDATE public.user SET ${setStrSliced} WHERE id=$1 RETURNING *`;
    const values = [req.headers.userid];
    try {
      await client.query(query, values);
      res.json({ message: `User ${req.body.username} updated` });
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: err.message });
    }
  }

  /**
   *
   * @param {*} password
   * @returns
   */
  checkPassword(password) {
    return bcrypt.compareSync(password, this.password);
  }
}

module.exports = User;
