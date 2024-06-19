const callController = require('../controllers/callController');
const Validator = require('../middlewares/Validator');
const Language = require('../middlewares/Language');

module.exports = (app) => {

    app.post("/call/new", async (req, res) => {
        const { roomNumber } = req.body;
        try {
            const date = await callController.openCall(roomNumber);
            return res.status(200).json(date);
        } catch (error) {
            res.status(422).json(Language.getMessage('INTERNAL_ERROR') + error);
        }
    });

    app.post("/call/post", async (req, res) => {
        const { data } = req.body;
        try {
            const attendance = await callController.recordAttendance(data);
            return res.status(200).json(attendance);
        } catch (error) {
            res.status(422).json({ message: getMessage('INTERNAL_ERROR'), error: error.message });
        }
    });
    

    app.get("/call/get", async (req, res) => {
        const { roomNumber } = req.body;
        try {
            const date = await callController.getCall(roomNumber);
            return res.status(200).json(date);
        } catch (error) {
            res.status(422).json(Language.getMessage('INTERNAL_ERROR') + error);
        }
    });

    app.get("/call/getUser", async (req, res) => {
        const { roomNumber, name } = req.body;
        try {
            const date = await callController.getCallUser(roomNumber, name);
            res.status(200).json(date);
        } catch (error) {
            res.status(422).json(Language.getMessage('INTERNAL_ERROR') + error);
        }
    });

}