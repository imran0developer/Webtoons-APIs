const mongoose = require('mongoose');

const webtoonSchema = new mongoose.Schema({
    title: { type: String, required: true },
    creator: { type: String, required: true },
    genre: { type: String, required: true },
    description: { type: String, required: true },
    cover_image: { type: String, required: true },
});

module.exports = mongoose.model('webtoons', webtoonSchema);
