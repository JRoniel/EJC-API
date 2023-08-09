const jwt = require('jsonwebtoken');
const userModel = require('../models/userModel');
require('dotenv').config();

async function createToken(username) {
  try {
    const userRole = await userModel.getUserRole(username);
    if (!userRole) {
      throw new Error('Usuário não encontrado ou permissão não definida.');
    }

    const tokenData = {
      username: username,
      role: userRole
    };

    addToken(signToken(tokenData));

  } catch (error) {
    console.error('[LOG-ERROR] Erro ao criar token:', error);
    return null;
  }
}

function signToken(tokenData) {
  const token = jwt.sign(tokenData, process.env.JWT_SECRET, { expiresIn: '1h' });
  return token;
}

function addToken(value) {
  const key = 'token';
  localStorage.setItem(key, value);
}

function removeToken(key) {
  localStorage.removeItem(key);
}

async function decodeToken(key) {
  const item = localStorage.getItem(key);
  if (item) {
    try {
      const decodedItem = JSON.parse(Buffer.from(item.split('.')[1], 'base64').toString('utf-8'));
      return decodedItem;
    } catch (error) {
      console.error('Erro ao decodificar o item:', error);
    }
  } else {
    console.log(`[LOG-ERROR]> Item '${key}' não encontrado.`);
  }
}

function getTokenData() {
  const token = localStorage.getItem('token');
  if (token) {
    try {
      const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
      return decodedToken;
    } catch (error) {
      console.error('[LOG-ERROR] Erro ao verificar token:', error);
    }
  } else {
    console.log('[LOG-ERROR] Token não encontrado.');
  }
}

module.exports = {
  createToken,
  addToken,
  removeToken,
  decodeToken,
  getTokenData
};
