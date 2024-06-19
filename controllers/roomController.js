const mongoose = require('mongoose');
const { getMessage } = require('../middlewares/Language');
const Room = require('../models/Room');
const DataProcessing = require('../middlewares/DataProcessing');

/*
* Cria uma nova sala
* Retorna uma mensagem de sucesso ou erro
*/
async function createRoom(number, name_room) {
  const existingRoom = await Room.findOne({ number });
  if (existingRoom) {
    throw new Error(getMessage('ROOM_EXISTS'));
  }

  const room = new Room({ number, name_room });
  await room.save();
  return room;
}

/*
* Busca todas as salas
* Retorna uma mensagem de erro ou uma lista de salas
*/
async function getAllRooms() {
  const rooms = await Room.find();
  if (rooms.length === 0) {
    throw new Error(getMessage('NO_DATA'));
  }
  return rooms;
}

/*
* Busca uma sala pelo número
* Retorna uma mensagem de erro ou a sala encontrada
*/
async function getRoomDetails(number) {
  const numberInt = parseInt(number);
  const room = await Room.findOne({ numberInt });
  if (!room) {
    throw new Error(getMessage('NO_DATA'));
  }
  return room;
}

/*
* Busca os usuários de uma determinada sala
* Retorna uma mensagem de erro ou uma lista de nomes de usuários
*/
async function getUsersInRoom(number) {
  const room = await getRoomDetails(number);
  const userNames = await Promise.all(room.users.map(async user => {
    const userData = await DataProcessing.getUserBasedOnId(user);
    return userData.name;
  }));

  return userNames;
}

/*
* Adiciona um membro na sala
* Retorna uma mensagem de erro ou a sala atualizada
*/
async function addUserToRoom(roomNumber, userId) {
  const room = await getRoomDetails(roomNumber);
  if (!mongoose.Types.ObjectId.isValid(userId)) {
    throw new Error(getMessage('INVALID_ID'));
  }

  const userExists = room.users.some(u => u.equals(userId));

  if (userExists) {
    throw new Error(getMessage('USER_EXISTS'));
  }

  room.users.push(userId);
  await room.save();
  return room;
}

/*
* Remove um membro da sala
* Retorna uma mensagem de erro ou a sala atualizada
*/
async function deleteRoom(roomNumber) {
  const result = await Room.deleteOne({ number: roomNumber });
  if (result.deletedCount === 0) {
    throw new Error(getMessage('ROOM_NOT_FOUND'));
  }

  return getMessage('ROOM_DELETED');
}

/*
* Remove um membro da sala
* Retorna uma mensagem de erro ou a sala atualizada
*/
async function removeUserFromRoom(roomNumber, userId) {
  if (!mongoose.Types.ObjectId.isValid(userId)) {
    throw new Error(getMessage('INVALID_ID'));
  }

  const result = await Room.updateOne(
    { number: roomNumber },
    { $pull: { users: userId } }
  );

  if (result.modifiedCount === 0) {
    throw new Error(getMessage('USER_NOT_FOUND'));
  }

  return getMessage('USER_REMOVED');
}

module.exports = {
  createRoom,
  getAllRooms,
  getRoomDetails,
  addUserToRoom,
  deleteRoom,
  removeUserFromRoom,
  getUsersInRoom
};

