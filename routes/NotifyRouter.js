const NotifyController = require('../controllers/NotifyController');
const Validator = require('../middlewares/Validator');

module.exports = (app) => {

    app.post("/notify/", async (req, res) => {
        const { email, type, message } = req.body;

        if(!Validator.isValidator('email', email)) {
            return res.status(422).json({ msg: 'Email inválido!' });
        }

        if(!Validator.isValidator('message', message)) {
            return res.status(422).json({ msg: 'Mensagem inválida!' });
        }

        try {
            const notify = await NotifyController.registerNotify(email, type, message);
            return res.status(200).json({ msg: 'Notificação registrada com sucesso!' });
        } catch (error) {
            res.status(422).json({ msg: error.message });
        }
    })

    app.get("/notify/", async (req, res) => {
        const { email } = req.body;
        
        if(!Validator.isValidator('email', email)) {
            return res.status(422).json({ msg: 'Email inválido!' });
        }

        try {
         const notifies = await NotifyController.getNotify(email);
            if (!notifies) {
                return res.status(204).json({ msg: 'Nenhuma notificação encontrada.' });
            }
            return res.status(200).json(notifies);
        } catch (error) {
            res.status(500).send(error.message);
        }
    })

    
    app.get("/notify/level/", async (req, res) => {
     
        const { level } = req.body;
        if(!Validator.isValidator('level', level)) {
            return res.status(422).json({ msg: 'Level inválido!' });
        }

        try {
         const notifies = await NotifyController.getNotifyLevel(level);
            if (!notifies) {
                return res.status(204).json({ msg: 'Nenhuma notificação encontrada.' });
            }
            return res.status(200).json(notifies);
        } catch (error) {
            res.status(500).send(error.message);
        }
    });

    app.post("/notify/level", async (req, res) => {
        const { level, message } = req.body;

        if(!Validator.isValidator('level', level)) {
            return res.status(422).json({ msg: 'Level inválido!' });
        }

        if(!Validator.isValidator('message', message)) {
            return res.status(422).json({ msg: 'Mensagem inválida!' });
        }

        try {
            const notify = await NotifyController.registerNotifyLevel(level, message);
            return res.status(200).json({ msg: 'Notificação registrada com sucesso!' });
        } catch (error) {
            res.status(422).json({ msg: error.message });
        }
    })
    
}


