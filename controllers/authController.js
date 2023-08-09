const userModel = require('../models/userModel');
const tokenController = require('../controllers/tokenController');
const jwt = require('jsonwebtoken');

const express = require('express');

const app = express();

module.exports = {
  login: async (req, res) => {
    const { username, password } = req.body;

    try {
      const user = await userModel.getUserByUsername(username);

      if (!user) {
        console.log('[LOG-EVENT] Credenciais informadas inválidas ou incorretas');
        return res.redirect('/auth');
      }
      /*
      const passwordMatch = await userModel.comparePassword(user, password);

      if (!passwordMatch) {
        console.log('[LOG-EVENT] Senha incorreta');
        return res.redirect('/auth');
      }
      */

      // Autenticação bem-sucedida
      tokenController.createToken(username); // Passando a resposta (res) para adicionar o token no Local Storage

      return res.redirect('/dashboard');
    } catch (error) {
      console.error('Erro ao fazer login:', error);
      return res.status(500).send('Erro no servidor.');
    }
  },

  checkRole: (roleRequired) => {
    return async (req, res, next) => {
      const token = tokenController.getTokenData(); // Use o método getTokenData para obter os dados do token do Local Storage

      if (!token) {
        console.error('[LOG-ERROR] Token não fornecido');
        return res.redirect('/auth');
      }

      try {
        if (token.role !== roleRequired) {
          console.error('[LOG-ERROR] Acesso não autorizado');
          return res.redirect('/auth');
        }

        next();
      } catch (error) {
        console.error('[LOG-ERROR] Token inválido:', error);
        return res.redirect('/auth');
      }
    };
  },

  logout: async (req, res) => {
    tokenController.removeToken();
    res.redirect('auth/logout');
  }
};
