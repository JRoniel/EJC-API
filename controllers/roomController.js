const mongoose = require('mongoose');
const Validator = require('../middlewares/Validator');
const { getMessage } = require('../middlewares/Language');
const Room = require('../models/Room');

/*
* Cria uma nova sala
* @param {number} number - Número da sala
*/
async function registerRoom(number) {
  if (Validator.isValidator('number', number)) {
    throw new Error(getMessage('INVALID_NUMBER'));
  }

  const existingRoom = await Room.findOne({ number });
  if (existingRoom) {
    throw new Error(getMessage('ROOM_EXISTS'));
  }

  const newRoom = new Room({
    number,
  });
  await newRoom.save();
  return newRoom;
}


/*
* Retorna todas as salas
*/
async function getRooms() {
  const rooms = await Room.find();
  if (rooms.length === 0) {
    throw new Error(getMessage('NO_DATA'));
  }
  return rooms;
}

async function getRoom(number) {
  const room = await Room.findOne({ number });
  if (!room) {
    throw new Error(getMessage('NO_DATA'));
  }
  return room;
}
/*
* Adiciona um usuário à uma sala
* @param {number} number - Número da sala
* @param {string} userId - ID do usuário
*/

async function addToRoom(numero, userId) {
    const room = await getRoom(numero);
    if (!room) {
      throw new Error('Sala não encontrada');
    }

    if (!mongoose.Types.ObjectId.isValid(userId)) {
      throw new Error('ID de usuário não é valido');
    }
  
    const userExists = room.users.some(u => u.equals(userId));
    
    if (userExists) {
      throw new Error('Usuário já existe na sala');
    }
  
    room.users.push(userId);
    await room.save();
    return room;
  }

function deleteRoom(number) {
  return Room.deleteOne({ number });
}

function removeFromRoom(number, userId) {
  return Room.updateOne({ number }, { $pull: { users: userId } });
}

module.exports = { registerRoom, getRooms, getRoom, addToRoom, deleteRoom, removeFromRoom };

