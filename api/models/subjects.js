const mongoose = require('mongoose');
const subjectSchema = mongoose.Schema({
    sub_code: String,
    sub_name: String
});

module.exports = mongoose.model('Notify_Subject', subjectSchema);