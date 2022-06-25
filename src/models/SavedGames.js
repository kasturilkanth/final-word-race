const mongoose = require("mongoose");

var SavedGamesSchema = new mongoose.Schema({
  user_id: {
    required: [true, "Please provide user id"],
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  },
  score: {
    type: Number,
    required: [true, "Please provide score"]
  },
  level: {
    type: Number,
    required: [true, "Please provide level"]
  },
  multiplier: {
    type: Number,
    required: [true, "Please provide multiplier"]
  }
});

var SavedGames = mongoose.model("SavedGamesSchema", SavedGamesSchema);
module.exports = { SavedGames };
