const mongoose = require("mongoose");

const Activity = new mongoose.Schema({
    date: {
        type: Date,
        default: Date.now
      },
    activity: {
        type: String,
        default: "Write your custom text here"
    }
});

module.exports = mongoose.model("Activity", Activity);