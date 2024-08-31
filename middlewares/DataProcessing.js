
const mongoose = require('mongoose');

const User = require('../models/User');
const Language = require('../middlewares/Language');

// Função que busca o usuário com base no ID
async function getUserBasedOnId(id) {
    return await User.findById(id, {
      name: true
    });
}


/*
 * Função que retorna a mensagem e os dados processados
 * @param {string} message - Mensagem
 * @param {object} data - Dados processados
 * @returns {object} - Coleção com mensagem e dados
 * @example returnDataProcess('REGISTER_SUCESS', user)
 */
function returnDataProcess(message, data) {
  return { message: Language.getMessage(message), data };
}
module.exports = { getUserBasedOnId, returnDataProcess }