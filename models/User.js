const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },

    favorites: [{ type: mongoose.Schema.Types.ObjectId, ref: 'webtoons' }]

});

module.exports = mongoose.model('users', userSchema);
