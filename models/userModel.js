const mysql = require('mysql2');
const bcrypt = require('bcrypt');
require('dotenv').config();

class Database {
  constructor() {
    this.connection = mysql.createConnection({
      host: process.env.DB_HOST,
      user: process.env.DB_USER,
      password: process.env.DB_PASS,
      database: process.env.DB_NAME,
    });

    this.connect();
  }

  connect() {
    this.connection.connect((error) => {
      if (error) {
        console.error('[LOG-EVENT] Erro ao conectar ao banco de dados:', error.message);
        process.exit(1);
      }
      console.log('[LOG-EVENT] Conexão com o banco de dados estabelecida');
    });
  }

  async getUserByUsername(username) {
    try {
      const [results] = await this.connection.promise().query('SELECT * FROM users WHERE username = ?', [username]);
      return results.length === 0 ? null : results[0];
    } catch (error) {
      console.error('[LOG-EVENT] Erro ao buscar usuário no banco de dados:', error.message);
      throw error;
    }
  }

  async comparePassword(user, password) {
    try {
      return await bcrypt.compare(password, user.password);
    } catch (error) {
      console.error('[LOG-EVENT] Erro ao comparar senhas:', error.message);
      throw error;
    }
  }
}

module.exports = new Database();
