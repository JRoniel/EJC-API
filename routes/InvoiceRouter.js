
const Language = require('../middlewares/Language');
const InvoiceController = require('../controllers/invoiceController');

module.exports = (app) => {

    /* Retorna todas as faturas */
    app.get('/invoices', async (req, res) => {
        try {
            const invoices = await InvoiceController.getAllInvoices();
            if (!invoices.length) {
                return res.status(204).json(Language.getMessage('NO_DATA'));
            }
            return res.status(200).json(invoices);
        } catch (error) {
            res.status(500).send(Language.getMessage('INTERNAL_ERROR') + error);
        }
    });

    /* Cria uma nova fatura */
    app.post('/invoice/create', async (req, res) => {
        try {
            const { user } = req.body;

            const invoice = await InvoiceController.registerInvoice(user);
            if (!invoice) {
                return res.status(204).json(Language.getMessage('NO_DATA'));
            }

            return res.status(200).json(invoice);
        } catch (error) {
            res.status(500).send(Language.getMessage('INTERNAL_ERROR') + error);
        }   
    });
}
