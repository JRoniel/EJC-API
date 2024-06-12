const mongoose = require('mongoose');
const { getMessage } = require('../middlewares/Language');
const Room = require('../models/Room');
const DataProcessing = require('../middlewares/DataProcessing');

async function createRoom(number, name_room) {
  const existingRoom = await Room.findOne({ number });
  if (existingRoom) {
    throw new Error(getMessage('ROOM_EXISTS'));
  }

  const room = new Room({ number, name_room });
  await room.save();
  return room;
}

async function getAllRooms() {
  const rooms = await Room.find();
  if (rooms.length === 0) {
    throw new Error(getMessage('NO_DATA'));
  }
  return rooms;
}

async function getRoomDetails(number) {
  const room = await Room.findOne({ number });
  if (!room) {
    throw new Error(getMessage('NO_DATA'));
  }
  return room;
}

async function getUsersInRoom(number) {
  const room = await getRoomDetails(number);
  const userNames = await Promise.all(room.users.map(async user => {
    const userData = await DataProcessing.getUserBasedOnId(user);
    return userData.name;
  }));

  return userNames;
}

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

async function deleteRoom(roomNumber) {
  const result = await Room.deleteOne({ number: roomNumber });
  if (result.deletedCount === 0) {
    throw new Error(getMessage('ROOM_NOT_FOUND'));
  }

  return getMessage('ROOM_DELETED');
}

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

