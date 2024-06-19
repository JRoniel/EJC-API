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
        const { roomNumber, attendanceData } = req.body;
        try {
            const date = await callController.recordAttendance(roomNumber, attendanceData);
            res.status(200).json(date);
        } catch (error) {
            res.status(422).json(Language.getMessage('INTERNAL_ERROR') + error);
        }
    });

    app.get("/call/get", async (req, res) => {
        const { roomNumber } = req.body;
        try {
            const date = await callController.getCall(roomNumber);
            res.status(200).json(date);
        } catch (error) {
            res.status(422).json(Language.getMessage('INTERNAL_ERROR') + error);
        }
    });

}