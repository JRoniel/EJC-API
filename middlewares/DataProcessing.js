
const mongoose = require('mongoose');

const User = require('../models/User');

// Função que busca o usuário com base no ID
async function getUserBasedOnId(id) {
    return await User.findById(id, {
      name: true
    });
  }

module.exports = { getUserBasedOnId }