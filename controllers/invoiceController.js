const Invoice = require('../models/Invoice');
const Validator = require('../middlewares/Validator');
const Language = require('../middlewares/Language');
const { get } = require('mongoose');

/**
 * Obtém uma fatura de um usuário
 * @param {string} user - Nome do usuário
 * @returns {Promise<Object>} - Retorna a fatura do usuário, ou undefined se não existir
 */
async function getInvoice(user) {
    if (!Validator.isValidator('user', user)) {
        return Language.getMessage('INVALID_USER');
    }
    try {
        return await Invoice.findOne({ name: user }, { value: true });
    } catch (error) {
        return Language.getMessage('INTERNAL_ERROR') + error;
    }
}

/**
 * Cadastra uma fatura para um usuário
 * @param {string} user - Nome do usuário
 * @returns {Promise<Object>} - Retorna a fatura do usuário, ou uma mensagem de erro
 */
async function registerInvoice(user) {
    if (!Validator.isValidator('user', user)) {
        return Language.getMessage('INVALID_USER');
    }
    try {
        const invoice = new Invoice({
            name: user,
            value: 0
        });
        return await invoice.save();
    } catch (error) {
        return Language.getMessage('INTERNAL_ERROR') + error;
    }
}

/**
 * Paga uma fatura de um usuário
 * @param {string} user - Nome do usuário
 * @param {number} numberInvoicesPayed - Número de faturas pagas
 * @returns {Promise<Object>} - Retorna a fatura do usuário, ou uma mensagem de erro
 */
async function payInvoice(user, numberInvoicesPayed) {
    if (!Validator.isValidator('user', user)) {
        return Language.getMessage('INVALID_USER');
    }
    try {
        const invoice = await Invoice.findOneAndUpdate(
            { name: user },
            { $inc: { value: numberInvoicesPayed } },
            { new: true }
        );
        return invoice;
    } catch (error) {
        return Language.getMessage('INTERNAL_ERROR') + error;
    }
}

/**
 * Retorna todas as faturas
 * @returns {Promise<Array>} - Retorna todas as faturas
 */
async function getAllInvoices() {
    return Invoice.find();
}

/**
 * Retorna todas as faturas em atraso
 * @returns {Promise<Array>} - Retorna todas as faturas em atraso
 */
async function getLateInvoices(date = new Date()) {
    const firstDay = new Date(Date.UTC(date.getFullYear(), date.getMonth(), 1));
    const lastDay = new Date(Date.UTC(date.getFullYear(), date.getMonth() + 1, 0));
    return Invoice.find({ value: { $lt: 2 } }, { _id: 0, name: 1, value: 1, createdAt: { $gte: firstDay, $lte: lastDay } });
}

module.exports = {
    registerInvoice,
    getInvoice,
    payInvoice,
    getAllInvoices,
    getLateInvoices
}

