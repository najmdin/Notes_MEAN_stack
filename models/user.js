const mongoose = require('mongoose');

const noteSchema = mongoose.Schema({
    login: { type:String, required: true},
    fullName: { type:String, required: true},
    password: { type:String, required: true},
});

module.exports = mongoose.model('User', noteSchema);