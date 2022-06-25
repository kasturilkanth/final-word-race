const express = require("express");
const error = require("../middleware/error");
const cors = require("cors");
const api = require("../api/index");

module.exports = function (app) {
  app.use(cors());
  app.use(express.json());
  app.use(error);
  app.use("/api", api);
};
