const mongoose = require('mongoose');

const CallSchema = new mongoose.Schema({
    roomNumber: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    },
    attendanceData: [{
        name: {
            type: String,
            required: true
        },
        attendance: {
            type: String,
            enum: ['present', 'absent']
        }
    }]
});

module.exports = mongoose.model('Call', CallSchema);
