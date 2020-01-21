const mongoose = require('mongoose');
const userSchema = mongoose.Schema({
    user_name: String,
    user_email: String,
    user_password: String,
    user_batch:String
});


module.exports = mongoose.model('Notify_User', userSchema);