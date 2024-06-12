const mongoose = require('mongoose');

const roomSchema = new mongoose.Schema({
  number: { type: Number, required: true },
  name: { type: String, required: true },
  users: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }]
});

const Room = mongoose.model('Room', roomSchema);

module.exports = Room;
