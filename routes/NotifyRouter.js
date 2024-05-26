const NotifyController = require('../controllers/NotifyController');
const Validator = require('../middlewares/Validator');
const Language = require('../middlewares/Language');

module.exports = (app) => {

    app.post("/notify/", async (req, res) => {
        const { email, message } = req.body;

        if(!Validator.isValidator('email', email)) {
            return res.status(422).json(Language.getMessage('INVALID_EMAIL'));
        }

        if(!Validator.isValidator('message', message)) {
            return res.status(422).json(Language.getMessage('INVALID_MESSAGE'));
        }

        try {
            const notify = await NotifyController.registerNotify(email, message);
            return res.status(200).json(Language.getMessage('MESSAGE_SUCESS'));
        } catch (error) {
            res.status(422).json(Language.getMessage('INTERNAL_ERROR' + error));
        }
    })

    app.get("/notify/", async (req, res) => {
        const { email } = req.body;
        
        if(!Validator.isValidator('email', email)) {
            return res.status(422).json(Language.getMessage('INVALID_EMAIL'));
        }

        try {
         const notifies = await NotifyController.getNotify(email);
            if (!notifies) {
                return res.status(204).json(Language.getMessage('NO_DATA'));
            }
            return res.status(200).json(notifies);
        } catch (error) {
            res.status(500).send(Language.getMessage('INTERNAL_ERROR' + error));
        }
    })

    
    app.get("/notify/level/", async (req, res) => {
     
        const { level } = req.body;
        if(!Validator.isValidator('level', level)) {
            return res.status(422).json(Language.getMessage('INVALID_LEVEL'));
        }

        try {
         const notifies = await NotifyController.getNotifyLevel(level);
            if (!notifies) {
                return res.status(204).json(Language.getMessage('NO_DATA'));
            }
            return res.status(200).json(notifies);
        } catch (error) {
            res.status(500).send(Language.getMessage('INTERNAL_ERROR' + error));
        }
    });

    app.post("/notify/level", async (req, res) => {
        const { level, message } = req.body;

        if(!Validator.isValidator('level', level)) {
            return res.status(422).json(Language.getMessage('INVALID_LEVEL'));
        }

        if(!Validator.isValidator('message', message)) {
            return res.status(422).json(Language.getMessage('INVALID_MESSAGE'));
        }

        try {
            const notify = await NotifyController.registerNotifyLevel(level, message);
            return res.status(200).json(Language.getMessage('MESSAGE_SUCESS'));
        } catch (error) {
            res.status(422).json(Language.getMessage('INTERNAL_ERROR' + error));
        }
    })
    
}


