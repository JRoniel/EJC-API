const mysql = require('mysql2');
const bcrypt = require('bcrypt');
require('dotenv').config();

let connection;

try {
  connection = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME
  });

  console.log('[LOG-EVENT] Conexão com o banco de dados estabelecida');

} catch (error) {
  console.error('[LOG-EVENT] Erro ao conectar ao banco de dados:', error.message);
  process.exit(1); // Encerrar o aplicativo em caso de falha na conexão
}

module.exports = {
  getUserByUsernameAndPassword: async (username, password) => {
    try {

      console.log('[LOG-EVENT]>> Chamando banco de dados para consulta');

      const [results] = await connection.promise().query('SELECT * FROM users WHERE username = ?', [username]);

      if (results.length === 0) {
        return null;
      }

      const user = results[0];
      const bcryptResult = await bcrypt.compare(password, user.password);

      if (!bcryptResult) {
        return null;
      }
      
      return user;

    } catch (error) {
      console.error('[LOG-EVENT] Erro ao buscar usuário no banco de dados:', error.message);
      throw error;
    }
  }
};
