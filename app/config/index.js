require("dotenv").config();
const db = require("./db.config");
const auth = require("./auth.config");

module.exports = {
  db,
  auth,
};
