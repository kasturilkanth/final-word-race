const _ = require("lodash");
const { User } = require("../../models/User");

module.exports = {
  getUser: async (req, res) => {
    try {
      var user = await User.findOne({ email: req.body.email });
      if (!user) {
        throw "User doesn't exist";
      }
      res.status(200).send({ success: true, user });
    } catch (e) {
      res.status(500).send({ success: false, message: e });
    }
  },
  addUser: async (req, res) => {
    try {
      var user = await User.findOne({ email: req.body.email });
      if (user) {
        throw "User already exists";
      }
      var body = _.pick(req.body, ["name", "email"]);
      var user = new User(body);
      var addedUser = await user.save();
      res.status(200).send({ success: true, addedUser });
    } catch (e) {
      res.status(500).send({ success: false, message: e });
    }
  },
  updateUserData: async (req, res) => {
    try {
      var user = await User.findOne({ email: req.body.email });
      if (!user) {
        throw "User doesn't exist";
      }
      if (!req.body.score) {
        throw "Provide Score";
      }
      var gamesPlayed = user.gamesPlayed + 1;
      var totalScore = user.totalScore + req.body.score;
      var averageScore = totalScore / gamesPlayed;
      var maxLevel = Math.max(user.maxLevel, req.body.level ?? 0);
      var updatedUser = await User.findByIdAndUpdate(
        user._id,
        {
          gamesPlayed,
          totalScore,
          averageScore,
          maxLevel
        },
        { new: true }
      );
      return res.status(200).send({ success: true, updatedUser });
    } catch (e) {
      res.status(500).send({ success: false, message: e });
    }
  }
};
