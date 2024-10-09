// backend/models/Ad.js
const mongoose = require('mongoose');

const adSchema = new mongoose.Schema({
    title: { type: String, required: true },
    url: { type: String, required: true },
    views: { type: Number, default: 0 },
});

module.exports = mongoose.model('Ad', adSchema);
