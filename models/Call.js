const mongoose = require('mongoose');

const CallSchema = new mongoose.Schema({
    roomNumber: {
        type: String,
        required: true
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
    }],
    date: {
        type: Date,
        default: function() {
            var date = new Date();
            var day = date.getDate();
            var month = date.getMonth() + 1;
            var year = date.getFullYear();
            return day + '/' + month + '/' + year;
        }
    }
});

module.exports = mongoose.model('Call', CallSchema);
