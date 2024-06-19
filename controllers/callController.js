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
async function recordAttendance(data) {
    if (!data || !data.roomNumber || !data.attendanceData) {
        return { message: 'Entrada incorreta' };
    }

    try {
        const room = await roomController.getRoomDetails(data.roomNumber);

        if (!room) {
            return { message: getMessage('NO_DATA') };
        }

        console.log("Data received for attendance:", data);

        const attendanceArray = Object.keys(data.attendanceData).map(name => ({
            name,
            attendance: data.attendanceData[name] || 'absent'
        }));

        const callRecord = new Call({
            roomNumber: data.roomNumber,
            attendanceData: attendanceArray
        });

        await callRecord.save();
        return { message: 'Chamada registrada', callRecord };

    } catch (error) {
        console.error("Error saving call record:", error);
        return { message: getMessage('INTERNAL_ERROR'), error: error.message };
    }
}


function getCall(roomNumber) {
    return Call.find({ roomNumber });
}

function getCallUser(roomNumber, name) {
    return Call.find({ roomNumber, 'attendanceData.name': name }, { date: true });
}

module.exports = {
    openCall,
    recordAttendance,
    getCall,
    getCallUser
};
