
const Language = require('../middlewares/Language');
const RoomController = require('../controllers/roomController');
const Room = require('../models/Room');

module.exports = (app) => {

/* Retorna todas as salas */
    app.get('/room', async (req, res) => {
        try {
            const rooms = await RoomController.getAllRooms();
            if (!rooms.length) {
                return res.status(204).json(Language.getMessage('NO_DATA'));
            }
            return res.status(200).json(rooms);
        } catch (error) {
            res.status(500).send(Language.getMessage('INTERNAL_ERROR') + error);
        }
    });

/* Cria uma nova sala */
    app.post('/room/create', async (req, res) => {
        try {
            const { number, name_room } = req.body;

            const room = await RoomController.registerRoom(number, name_room);
            if (!room) {
                return res.status(204).json(Language.getMessage('NO_DATA'));
            }

            return res.status(200).json(room);
        } catch (error) {
            res.status(500).send(Language.getMessage('INTERNAL_ERROR') + error);
        }
    });

/* Adiciona um membro na sala */
    app.post('/room/add', async (req, res) => {
        try {
            const { number, user } = req.body;

            const room = await RoomController.addToRoom(number, user);
            if (!room) {
                return res.status(204).json(Language.getMessage('NO_DATA'));
            }

            return res.status(200).json(room);
        } catch (error) {
            res.status(500).send(Language.getMessage('INTERNAL_ERROR') + error);
        }
    });

    /* Remove um membro da sala */
    app.delete('/room/remove', async (req, res) => {
        try {
            const { number, user } = req.body;

            const room = await RoomController.removeFromRoom(number, user);
            if (!room) {    
                return res.status(204).json(Language.getMessage('NO_DATA'));
            }

            return res.status(200).json(room);
        } catch (error) {
            res.status(500).send(Language.getMessage('INTERNAL_ERROR') + error);
        }
    });

    /* Deleta uma sala */
    app.delete('/room/delete', async (req, res) => {
        try {
            const { number } = req.body;
            
            const room = await RoomController.deleteRoom(number);
            if (!room) {
                return res.status(204).json(Language.getMessage('NO_DATA'));
            }

            return res.status(200).json(room);
        } catch (error) {
            res.status(500).send(Language.getMessage('INTERNAL_ERROR') + error);
        }
    });    

    app.get('/room/users', async (req, res) => {
        try {
            const { number } = req.body;
            const users = await RoomController.getUsersInRoom(number);
            return res.status(200).json(users);
        } catch (error) {
            res.status(500).send(Language.getMessage('INTERNAL_ERROR') + error);
        }
    });
};
