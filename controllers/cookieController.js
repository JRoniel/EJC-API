const jwt = require('jsonwebtoken');
const userModel = require('../models/userModel');
require('dotenv').config();

const express = require('express');
const cookieParser = require('cookie-parser');

const app = express();
app.use(cookieParser());

async function createToken(username) {
  try {
    const userRole = await userModel.getUserRole(username);
    if (!userRole) {
      throw new Error('Usuário não encontrado ou permissão não definida.');
    }

    const tokenData = username;

    console.log('Preparando para criar token com:', tokenData);
    return signToken(tokenData);
  } catch (error) {
    console.error('[LOG-ERROR] Erro ao criar token:', error);
    return null;
  }
}

function signToken(tokenData) {
  const token = jwt.sign(tokenData, process.env.JWT_SECRET, { expiresIn: '1h' });
  return token;
}

function checkRole(roleRequired) {
  return async (req, res, next) => {
    const token = req.cookies.token;

    if (!token) {
      console.error('[LOG-ERROR] Token não fornecido');
      return res.redirect('/auth'); // Redireciona para a página de autenticação
    }

    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      if (decoded.role !== roleRequired) {
        console.error('[LOG-ERROR] Acesso não autorizado');
        return res.redirect('/unauthorized'); // Redireciona para a página de acesso não autorizado
      }

      next();
    } catch (error) {
      console.error('[LOG-ERROR] Token inválido:', error);
      return res.redirect('/auth'); // Redireciona para a página de autenticação
    }
  };
}

function addCookie(res, name, value, options = {}) {
  res.cookie(name, value, options);
}

function removeCookie(res, name) {
  res.clearCookie(name);
}

async function decodeCookie(token) {
  if (token) {
    try {
      const decodedToken = JSON.parse(Buffer.from(token.split('.')[1], 'base64').toString('utf-8'));
      console.log('retorno decod token:', decodedToken);
      return decodedToken;
    } catch (error) {
      console.error('Erro ao decodificar o token:', error);
    }
  } else {
    console.log('DECODECOOKIE> Token não encontrado.');
  }
}

module.exports = {
  createToken,
  checkRole,
  addCookie,
  removeCookie,
  decodeCookie
};
