const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const exerciseSchema = new Schema({
    username: { type: String, required: true },
    description: { type: String, required: true },
    reminder: { type: Number, required: true },
    date: { type: Date, required: true },
}, {
    timestamps: true,
});

const Reminder = mongoose.model('Reminder', exerciseSchema);

mondule.exports = Reminder;