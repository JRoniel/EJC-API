const mongoose = require('mongoose')

const NotifySchema = new mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    target: { type: String, required: true },
    type: { type: String, required: true },
    message: { type: String, required: true },
    date: { type: Date, default: Date.now }
})


const Notify = mongoose.model('Notify', NotifySchema)

module.exports = Notify