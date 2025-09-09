const pool = require('../../infraestructure/config/database.js');
const User = require('../../domain/models/user.model');

class UserRepository {
  async save(user) {
    const [result] = await pool.query('INSERT INTO users (name, email, password) VALUES (?, ?, ?)', 
      [user.name, user.email, user.password]
    );
    user.id = result.insertId;
    return user;
  }

  async findByEmail(email) {
    const [rows] = await pool.query('SELECT * FROM users WHERE email = ?', [email]);
    if (rows.length === 0) return null;
    return new User(rows[0]);
  }
}

module.exports = UserRepository;