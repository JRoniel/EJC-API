
const mongoose = require("mongoose");
const User = require("../models/User");


/**
 * Atualiza um usuario
 * @param {Object} req
 * @param {Object} res
 * @param {Function} next
 * @returns {Promise}  
 */
function updateUser(req, res, next) {
    const { item, value } = req.body;
    const userId = req.params.id;

    User.findByIdAndUpdate(userId, {
        [item]: value
    }, {
        new: true
    })
        .then(user => {return user})
        .catch(next);
}

/**
 * Busca um usuario por ID
 * @param {String} reqId
 * @returns {Promise}  
 */
function getUser(reqId) {
    const ObjectID = mongoose.Types.ObjectId(reqId);
    return User.findById(ObjectID, {
        _id: true,
        name: true,
        email: true,
        level: true
    });
}

/**
 * Busca um usuario por email
 * @param {String} email
 * @returns {Promise}  
 */
async function getUserFromEmail(email) {

    user = await User.findOne({ email });

    return user;
}

module.exports = {
    updateUser,
    getUserFromEmail,
    getUser
};