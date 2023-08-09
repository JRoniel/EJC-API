const bcrypt = require('bcrypt');

const saltRounds = 10;

async function hashPassword(password) {
  try {
    const salt = await bcrypt.genSalt(saltRounds);
    const hash = await bcrypt.hash(password, salt);
    return hash;
  } catch (error) {
    console.error('Erro ao criptografar a senha:', error);
    throw error;
  }
}

module.exports = {
  hashPassword
};
