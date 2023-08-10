const LocalStorage = require('node-localstorage').LocalStorage;
const localStorage = new LocalStorage('./local-storage');

const jwt = require('jsonwebtoken');
const userModel = require('../models/userModel');
require('dotenv').config();

function createToken(loggedUser) {
  return new Promise(async (resolve, reject) => {
    try {
      const userRole = await userModel.getUserRole(loggedUser.username);
      if (!userRole) {
        throw new Error('Usuário não encontrado ou permissão não definida.');
      }

      const tokenData = {
        id: loggedUser.id,
        username: loggedUser.username,
        role: userRole
      };

      const token = signToken(tokenData);
      addTokenToStorage(token);
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

function removeToken() {
  localStorage.removeItem('token');
}

async function decodeToken(key) {
  const item = localStorage.getItem(key);

  if (item) {
    try {
      const decodedItem = JSON.parse(item); 
      return decodedItem;
    } catch (error) {
      console.error('Erro ao decodificar o item:', error);
    }
  } else {
    console.log(`[LOG-ERROR]> Item '${key}' não encontrado.`);
  }
}

function addTokenToStorage(value) { 
  localStorage.setItem('token', value);
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
  return null;
}


module.exports = {
  createToken,
  addTokenToStorage, 
  decodeToken,
  removeToken,
  getTokenData
};
