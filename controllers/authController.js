const userModel = require('../models/userModel');
const cookieController = require('../controllers/cookieController');

const express = require('express');
const cookieParser = require('cookie-parser');

const app = express();
app.use(cookieParser());

module.exports = {
  login: async (req, res) => {
    const { username, password } = req.body;

    try {
      const user = await userModel.getUserByUsername(username);

      if (!user) {
        console.log('[LOG-EVENT] Credenciais informadas inválidas ou incorretas');
        return res.redirect('/login'); // Redireciona de volta à página de login
      }

      const passwordMatch = await userModel.comparePassword(user, password);

      if (!passwordMatch) {
        console.log('[LOG-EVENT] Senha incorreta');
        return res.redirect('/login'); // Redireciona de volta à página de login
      }

      // Autenticação bem-sucedida
      const token = cookieController.createToken(username);

      if (token) {
        cookieController.addCookie(res, 'token', token, { httpOnly: true, maxAge: 3600000 });
      }

      return res.redirect('/dashboard'); // Redireciona para a página "dashboard.ejs" após o login bem-sucedido
    } catch (error) {
      console.error('Erro ao fazer login:', error);
      return res.status(500).send('Erro no servidor.');
    }
  },
};
