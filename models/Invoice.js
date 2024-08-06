const mongoose = require('mongoose');

/*
* Define o esquema do objeto Invoice
* @param {string} name - Nome do aluno
* @param {number} value - Numero de faturas do aluno, Exemplo: 1/12
*/
const InvoiceSchema = new mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    name: { type: String, required: true },
    value: { type: String, required: true }
});

const Invoice = mongoose.model('Invoice', InvoiceSchema);