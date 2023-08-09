const jwt = require('jsonwebtoken');
const userModel = require('../models/userModel');
require('dotenv').config();

function createToken(username) {
  return new Promise(async (resolve, reject) => {
    try {
      const userRole = await userModel.getUserRole(username);
      if (!userRole) {
        throw new Error('Usuário não encontrado ou permissão não definida.');
      }

      const tokenData = {
        username: username,
        role: userRole
      };

      const token = signToken(tokenData);
      addToken(token);
      resolve(token);
    } catch (error) {
      console.error('[LOG-ERROR] Erro ao criar token:', error);
      reject(error);
    }
  });
}

function signToken(tokenData) {
  return jwt.sign(tokenData, process.env.JWT_SECRET, { expiresIn: '1h' });
}

function addToken(value) {
  localStorage.setItem('token', value);
}

function removeToken() {
  localStorage.removeItem('token');
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
  getTokenData
};
