const bcrypt = require('bcrypt');
const mongoose = require('mongoose');

const User = require('../models/User');
const Validator = require('../middlewares/Validator');
const Language = require('../middlewares/Language');

/**
 * Faz login do usuario
 * @param {Object} req
 * @param {Object} res
 * @returns {Promise<String>}
 */
async function loginUser(req, res) {
  const { email, password } = req.body;

  if (!Validator.isValidator('email', email)) return Language.getMessage('INVALID_EMAIL');

  if (!Validator.isValidator('password', password)) return Language.getMessage('INVALID_PASSWORD');

  const user = await User.findOne({ email });

  if (!user) return Language.getMessage('USER_NOT_FOUND');

  const comparePassword = await bcrypt.compare(password, user.password);

  if (!comparePassword) return Language.getMessage('INVALID_PASSWORD');

  return user;
}

/**
 * Realiza o cadastro de um usuario
 * @param {Object} req
 * @param {Object} res
 * @returns {Promise<String>}
 */
async function registerUser(req, res) {
  const { name, email, password, level } = req.body;

  if (!Validator.isValidator('email', email)) return Language.getMessage('INVALID_EMAIL');

  if (!Validator.isValidator('password', password)) return Language.getMessage('INVALID_PASSWORD');

  if (!Validator.isValidator('level', level)) return Language.getMessage('INVALID_LEVEL');

  if (!Validator.isValidator('name', name)) return Language.getMessage('INVALID_NAME');

  const userExists = await User.findOne({ email });

  if (userExists) return Language.getMessage('INVALID_EMAIL_REGISTER');

  const user = new User({
    _id: new mongoose.Types.ObjectId(),
    level,
    name,
    email,
    password: await bcrypt.hash(password, 10),
  });

  try {
    await user.save();

    return Language.getMessage('REGISTER_SUCESS');
  } catch (error) {
    return Language.getMessage('INTERNAL_ERROR') + error;
  }
}

module.exports = {
  loginUser,
  registerUser,
};


