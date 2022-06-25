const express = require("express");
const gameController = require("./game.controller");

const router = express.Router();

router.get("/savedGames", gameController.savedGames);
router.post("/saveGame", gameController.saveGame);
router.get("/leaderboard", gameController.fetchLeaderBoard);

module.exports = router;
