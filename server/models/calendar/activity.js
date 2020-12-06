const mongoose = require("mongoose");

const Activity = new mongoose.Schema ({
    date: {
        type: Date,
        default: Date.now
      },
    activity: {
        type: String,
        default: ""
    },

});

module.exports = mongoose.model("activity", Activity)