const { name } = require('ejs');
const roomController = require('../controllers/roomController');
const { getMessage } = require('../middlewares/Language');
const Call = require('../models/Call');

/**
 * Abre uma chamada para a sala especificada e retorna os alunos em JSON
 */
async function openCall(roomNumber) {

    try {

        const users = await roomController.getUsersInRoom(roomNumber);
        if (users) {
            return users;
        } else {
            throw new Error(getMessage('NO_DATA'));
        }
    } catch (error) {
        throw new Error(getMessage('INTERNAL_ERROR') + error);
    }
}

/**
 * Recebe os dados de presença e falta dos alunos e processa a atualização
 */
async function recordAttendance(roomNumber, attendanceData) {

    try {
        const room = await roomController.getRoomDetails(roomNumber);

        if (!room) {
            return getMessage('NO_DATA');
        }

        const dataArray = Array.isArray(attendanceData) ? attendanceData : JSON.parse(attendanceData);

        const callRecord = new Call({
            roomNumber,
            attendanceData: dataArray.map(data => ({
                name: data.name,
                attendance: data.attendance || 'absent'
            }))
        });

        
        await callRecord.save();
        return 'Chamada registrada';

    } catch (error) {
        throw new Error(getMessage('INTERNAL_ERROR') + error);


        
    }
}

function getCall(roomNumber) {
    return Call.findOne({ roomNumber });
}

module.exports = {
    openCall,
    recordAttendance,
    getCall
};
