const mysql = require('mysql2/promise');
const bcrypt = require('bcrypt');
require('dotenv').config();

const express = require('express');
const cookieParser = require('cookie-parser');

const app = express();
app.use(cookieParser());

class Database {
  constructor() {
    this.pool = mysql.createPool({
      host: process.env.DB_HOST,
      user: process.env.DB_USER,
      password: process.env.DB_PASS,
      database: process.env.DB_NAME,
    });
  }

  async getUserByUsername(username) {
    try {
      const connection = await this.pool.getConnection();
      console.log('[LOG-EVENT] Conexão com o banco de dados estabelecida com sucesso');
      const [results] = await connection.query('SELECT * FROM users WHERE username = ?', [username]);
      connection.release();
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

  async getUserRole(username) {
    try {
      const connection = await this.pool.getConnection();
      const [results] = await connection.query('SELECT role FROM users WHERE username = ?', [username]);
      connection.release();
      return results.length === 0 ? null : results[0].role;
    } catch (error) {
      console.error('[LOG-EVENT] Erro ao buscar a role do usuário no banco de dados:', error.message);
      throw error;
    }
  }
}

module.exports = new Database();
