const db = require("../database/dbConfig");

module.exports = {
  adduser,
  findUser,
  getUsers,
};

function adduser(newUser) {
  return db("users").insert(newUser, "id");
}

function findUser(something) {
  return db("users").where(something);
}

function getUsers() {
  return db("users");
}
