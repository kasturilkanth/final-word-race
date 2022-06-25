const express = require("express");

const app = express();

require("./startup/routes")(app);
require("./startup/db")();
require("./startup/validation")();

const PORT = process.env.PORT || 4000;
const server = app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}...`);
});

app.get("/check", (req, res) => {
  res.status(200).json({ message: "Basic thing working fine in server" });
});

//server.close()

module.exports = server;
