const mongoose = require("mongoose");
const User = require("../models/User");

/**
 * Controller para atualizar um usuario
 * @param {Object} req
 * @param {Object} res
 * @param {Function} next
 * @returns {Promise}
 */
async function updateUser(req, res, next) {
  const { item, value } = req.body;
  const userId = req.params.id;

  try {
    const user = await User.findByIdAndUpdate(userId, { [item]: value }, { new: true });
    return user;
  } catch (error) {
    next(error);
  }
}

/**
 * Controller para buscar um usuario por ID
 * @param {String} userId
 * @returns {Promise}
 */
async function getUser(userId) {
  const objectId = mongoose.Types.ObjectId(userId);
  const user = await User.findById(objectId, {
    _id: true,
    name: true,
    email: true,
    level: true,
  });

  return user;
}

/**
 * Controller para buscar um usuario por email
 * @param {String} email
 * @returns {Promise}
 */
async function getUserFromEmail(email) {
  const user = await User.findOne({ email });
  return user;
}

module.exports = {
  updateUser,
  getUserFromEmail,
  getUser,
};
