
const mongoose = require('mongoose');

const User = require('../models/User');

// Função que busca o usuário com base no ID
async function getUserBasedOnId(id) {
    return await User.findById(id, {
      name: true
    });
  }
 /*
 * Correção e revisão para implementação
// Função que busca o usuário com base no email
async function getUserBasedOnEmail(email) {
    return await User.findOne({ email }, {
      name: true
    });
  }
*/


module.exports = { getUserBasedOnId }