const mongoose = require('mongoose');
const batchSchema = mongoose.Schema({
    batch_name: String,
    batch_year: String
});



module.exports = mongoose.model('Notify_Batch', batchSchema);