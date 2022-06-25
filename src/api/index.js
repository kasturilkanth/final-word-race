const express = require("express");

const router = express.Router();
const userRoutes = require("./user/user.route");
const gameRoutes = require("./game/game.route");

router.get("/", (req, res) => {
  res.json({
    message: "API Running."
  });
});

router.use("/user", userRoutes);
router.use("/game", gameRoutes);

module.exports = router;
