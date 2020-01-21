const mongoose = require('mongoose');
const teacherSchema = mongoose.Schema({
    teacher_id: Number,
    teacher_name: String
    });

module.exports = mongoose.model('Notify_Teacher', teacherSchema);