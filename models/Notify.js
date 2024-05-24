const mongoose = require('mongoose')

const NotifySchema = new mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    target: { type: String, required: false },
    message: { type: String, required: true },
    level: { type: Number, default: 0, required: false },
    date: { type: Date, default: Date.now }
})

const Notify = mongoose.model('Notify', NotifySchema)

module.exports = Notify
