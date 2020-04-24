const db = require("../database/dbConfig");

module.exports = {
  adduser,
  findUser,
};

function adduser(newUser) {
  return db("users").insert(newUser, "id");
}

function findUser(something) {
  return db("users").where(something);
}
