const bcrypt = require('bcrypt');
const mongoose = require('mongoose');

const User = require('../models/User');
const Validator = require('../middlewares/Validator');
const Language = require('../middlewares/Language');

/**
 * Faz login do usuario
 * @param {Object} req - Requisicao
 * @param {Object} res - Resposta
 * @returns {Promise<Object>} - Retorna o usuario caso o login seja feito com sucesso, caso contrario retorna um erro
 */
async function loginUser(req, res) {
    const { email, password } = req.body;

    // Valida o email
    if (!Validator.isValidator('email', email)) {
        return Language.getMessage('INVALID_EMAIL');
    }

    // Valida a senha
    if (!Validator.isValidator('password', password)) {
        return Language.getMessage('INVALID_PASSWORD');
    }

    // Busca o usuario no banco de dados
    const user = await User.findOne({ email });

    if (!user) {
        return Language.getMessage('USER_NOT_FOUND');
    }

    // Verifica se a senha eh valida
    const comparePassword = await bcrypt.compare(password, user.password);

    if (!comparePassword) {
        return Language.getMessage('INVALID_PASSWORD');
    }

    return user;
}

/**
 * Realiza o cadastro de um usuario
 * @param {Object} req - Requisicao
 * @param {Object} res - Resposta
 * @returns {Promise<Object>} - Retorna mensagem de cadastrado com sucesso, caso contrario retorna um erro
 */
async function registerUser(req, res) {
    const { name, email, password, level } = req.body;

    // Valida os campos
    if (!Validator.isValidator('email', email)) {
        return Language.getMessage('INVALID_EMAIL');
    }

    if (!Validator.isValidator('password', password)) {
        return Language.getMessage('INVALID_PASSWORD');
    }

    if (!Validator.isValidator('level', level)) {
        return Language.getMessage('INVALID_LEVEL');
    }

    if (!Validator.isValidator('name', name)) {
        return Language.getMessage('INVALID_NAME');
    }

    // Verifica se o usuario ja existe
    const userExists = await User.findOne({ email });

    if (userExists || !Validator.isValidator('email', email)) {
        return Language.getMessage('INVALID_EMAIL_REGISTER');
    }

    // Cria o usuario
    const user = new User({
        _id: new mongoose.Types.ObjectId(),
        level,
        name,
        email,
        password: await bcrypt.hash(password, 10)
    });

    try {
        // Salva o usuario
        const savedUser = await user.save();
 
        return language.getMessage('REGISTER_SUCESS');
    } catch (error) {
        return language.getMessage('INTERNAL_ERROR' + error);
    }
}

module.exports = {
    loginUser,
    registerUser,
};
