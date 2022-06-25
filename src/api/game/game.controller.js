const _ = require("lodash");
const { SavedGames } = require("../../models/SavedGames");
const { User } = require("../../models/User");

module.exports = {
  savedGames: async (req, res) => {
    try {
      const savedGames = await SavedGames.find().sort({ score });
      if (savedGames.length !== 0) {
        return res.staus(200).send({ success: true, savedGames });
      } else {
        return res.send({
          success: false,
          message: "No games to show, save one first"
        });
      }
    } catch (e) {
      res.status(500).send({ success: false, message: e });
    }
  },
  saveGame: async (req, res) => {
    try {
      var body = _.pick(req.body, ["user_id", "score", "level", "multiplier"]);
      var user = await User.findById(body.user_id);
      if (!user) {
        throw "Wrong UserId! User doesn't exist";
      }
      var game = new SavedGames(body);
      var savedGame = await game.save();
      res.status(200).send({ success: true, savedGame });
    } catch (e) {
      res.status(500).send({ success: false, message: e });
    }
  },
  fetchLeaderBoard: async (req, res) => {
    try {
      var leaderboard = await SavedGames.aggregate([
        {
          $lookup: {
            from: "users",
            localField: "user_id",
            foreignField: "_id",
            as: "leaderboard"
          }
        },
        { $sort: { score: -1 } },
        { $limit: 10 }
      ]);
      res.status(200).send({ success: true, leaderboard });
    } catch (e) {
      res.status(500).send({ success: false, message: e });
    }
  }
};
