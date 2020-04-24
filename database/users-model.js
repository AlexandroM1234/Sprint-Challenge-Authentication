const db = require("../database/dbConfig");

module.exports = {
  adduser,
};

function adduser(newUser) {
  return db("users").insert(newUser, "id");
}
