const mongoose = require("mongoose");

const UserSessionsSchema = new mongoose.Schema({
  userId: {
    type: String,
    default: "",
  },
  timestamp: {
    type: Date,
    default: Date.now(),
  },
  userDeleted: {
    type: Boolean,
    default: false,
  },
});

module.exports = mongoose.model("userSession", UserSessionsSchema);
