const Notify = require('../models/Notify')
const Validator = require('../middlewares/Validator');
const Language = require('../middlewares/Language');

/**
 * Registra uma notificação
 * @param {string} target - Email do destinatário da notificação
 * @param {string} type - Tipo da notificação
 * @param {string} message - Mensagem da notificação
 * @returns {string} - Mensagem de erro, caso haja, ou undefined caso a notificação seja registrada com sucesso
 */
function registerNotify(target, type, message) {
    if (!Validator.isValidator('email', target)) {
        return Language.getMessage('INVALID_EMAIL');
    }

    try {
        const notify = new Notify({
            target,
            type,
            message
        });
        notify.save();
    } catch (error) {
        console.log(error);
        return Language.getMessage('INTERNAL_ERROR');
    }
}

/**
 * Retorna todas as notificações de um usuário
 * @param {string} email - Email do usuário
 * @returns {Promise<Array<Notify>>} - Array de notificações do usuário
 */
function getAllNotifys(email) {
    return Notify.find({ target: email });
}

module.exports = {
    registerNotify,
    getAllNotifys
}
