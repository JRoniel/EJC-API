const bcrypt = require('bcrypt');
const mongoose = require('mongoose');

const User = require('../models/User');
const Validator = require('../middlewares/Validator');
const Language = require('../middlewares/Language');

/**
 * Faz login do usuario
 * @param {Object} req
 * @param {Object} res
 * @returns {Promise<Object>}
 */
async function loginUser(req, res) {
  const { email, password } = req.body;

  if (!Validator.isValidator('email', email)) {
    return res.status(400).json(Language.getMessage('INVALID_EMAIL'));
  }

  if (!Validator.isValidator('password', password)) {
    return res.status(400).json(Language.getMessage('INVALID_PASSWORD'));
  }

  const user = await User.findOne({ email });

  if (!user) {
    return res.status(404).json(Language.getMessage('USER_NOT_FOUND'));
  }

  const comparePassword = await bcrypt.compare(password, user.password);

  if (!comparePassword) {
    return res.status(400).json(Language.getMessage('INVALID_PASSWORD'));
  }

  return res.status(200).json(user);
}

/**
 * Realiza o cadastro de um usuario
 * @param {Object} req
 * @param {Object} res
 * @returns {Promise<Object>}
 */
async function registerUser(req, res) {
  const { name, email, password, level } = req.body;

  if (!Validator.isValidator('email', email)) {
    return res.status(400).json(Language.getMessage('INVALID_EMAIL'));
  }

  if (!Validator.isValidator('password', password)) {
    return res.status(400).json(Language.getMessage('INVALID_PASSWORD'));
  }

  if (!Validator.isValidator('level', level)) {
    return res.status(400).json(Language.getMessage('INVALID_LEVEL'));
  }

  if (!Validator.isValidator('name', name)) {
    return res.status(400).json(Language.getMessage('INVALID_NAME'));
  }

  const userExists = await User.findOne({ email });

  if (userExists) {
    return res.status(400).json(Language.getMessage('INVALID_EMAIL_REGISTER'));
  }

  const user = new User({
    _id: new mongoose.Types.ObjectId(),
    level,
    name,
    email,
    password: await bcrypt.hash(password, 10),
  });

  try {
    const savedUser = await user.save();

    return res.status(201).json(Language.getMessage('REGISTER_SUCESS'));
  } catch (error) {
    return res.status(500).json(Language.getMessage('INTERNAL_ERROR') + error);
  }
}

module.exports = {
  loginUser,
  registerUser,
};


