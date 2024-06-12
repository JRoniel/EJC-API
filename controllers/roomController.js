const mongoose = require('mongoose');
const { getMessage } = require('../middlewares/Language');
const Room = require('../models/Room');
const DataProcessing = require('../middlewares/DataProcessing');

/*
* Cria uma nova sala
* @param {number} number - Número da sala
*/
async function registerRoom(number, name_room) {

  const existingRoom = await Room.findOne({ number });
  if (existingRoom) {
    throw new Error(getMessage('ROOM_EXISTS'));
  }

  const newRoom = new Room({
    number,
    name_room
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

/*
* Retorna todos os usuarios de uma sala
* @param {number} number - Número da sala
*/
async function getRoom(number) {
  const room = await Room.findOne({ number });
  if (!room) {
    throw new Error(getMessage('NO_DATA'));
  }
  return room;
}

async function getUsersInRoom(number) {
  let data = await getRoom(number);
  let users = data.users;
  
  // Mapeia e aguarda cada operação assíncrona
  let userNames = await Promise.all(users.map(async user => {
    let userData = await DataProcessing.getUserBasedOnId(user);
    return userData.name;
  }));

  return userNames;
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

/*
* Remove uma sala
*/  
function deleteRoom(number) {
  return Room.deleteOne({ number });
}

/*
* Remove um membro da sala
* @param {number} number - Número da sala
* @param {string} userId - ID do usuário
*/
async function removeFromRoom(number, userId) {
  try {
    if (!mongoose.Types.ObjectId.isValid(userId)) {
      throw new Error('ID de usuário não é valido');
    }
    let resolve = await Room.updateOne({ number }, { $pull: { users: userId } });
    return getMessage('ACTION_SUCESS');

  } catch (error) {
    throw new Error('ID de usuário não é valido');
  }
}

module.exports = { registerRoom, getRooms, getRoom, addToRoom, deleteRoom, removeFromRoom, getUsersInRoom };

