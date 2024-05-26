const Notify = require('../models/Notify')
const Validator = require('../middlewares/Validator');
const Language = require('../middlewares/Language');

const mongoose = require('mongoose');

/**
 * Registra uma notificação
 * @param {string} target - Email do destinatário da notificação
 * @param {string} message - Mensagem da notificação
 * @returns {Promise<string | undefined>} - Mensagem de erro, caso haja, ou undefined caso a notificação seja registrada com sucesso
 */
async function registerNotify(target, message) {
    if (!Validator.isValidator('email', target)) {
        return Language.getMessage('INVALID_EMAIL');
    }

    try {
        const notify = new Notify({
            _id: mongoose.Types.ObjectId(),
            target,
            message
        });

        await notify.save();

        return undefined;
    } catch (error) {
        console.log(error);
        return Language.getMessage('INTERNAL_ERROR' + error);
    }
}

/**
 * Retorna todas as notificações de um usuário
 * @param {string} email - Email do usuário
 * @returns {Promise<Array<Notify>>} - Array de notificações do usuário
 */
async function getNotify(email) {
    return Notify.find({ target: email }, {
        _id: false,
        message: true
    })
}

/**
 * Registra uma notificação para todos os usuários de um determinado nivel
 * @param {number} level - nivel dos destinatários da notificação
 * @param {string} message - Mensagem da notificação
 * @returns {Promise<string | undefined>} - Mensagem de erro, caso haja, ou undefined caso a notificação seja registrada com sucesso
 */
async function registerNotifyLevel(level, message){
    
    if (!Validator.isValidator('level', level)) {
        return Language.getMessage('INVALID_LEVEL');
    }

    try {
        const notify = new Notify({
            _id: mongoose.Types.ObjectId(),
            level,
            message
        });

        await notify.save();

        return undefined;
    } catch (error) {
        console.log(error);
        return Language.getMessage('INTERNAL_ERROR' + error);
    }
}

/**
 * Retorna todas as notificações de um nivel
 * @param {number} level - level do usuário
 * @returns {Promise<Array<Notify>>} - Array de notificações do usuário
 */
function getNotifyLevel(level) {
    return Notify.find({ level }, {
        _id: false,
        message: true
    });
}

module.exports = {
    registerNotify,
    getNotify,
    getNotifyLevel,
    registerNotifyLevel
}

