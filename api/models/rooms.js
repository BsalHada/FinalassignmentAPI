const mongoose = require('mongoose');
const roomSchema = mongoose.Schema({
    room_no: String,
    floor: String
});

module.exports = mongoose.model('Notify_Room', roomSchema);