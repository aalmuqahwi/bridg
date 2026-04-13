const db = require("./db");

function createUser(name, email) {
  if (!name) throw new Error("Name is required");
  if (!email) throw new Error("Email is required");
  if (!email.includes("@")) throw new Error("Email is invalid");
  const user = db.insert("users", { name, email });
  return user;
}

function getUserById(id) {
  if (!id) throw new Error("ID is required");
  const user = db.findById("users", id);
  if (!user) throw new Error("User not found");
  return user;
}

function getAllUsers() {
  return db.findAll("users");
}

function updateUser(id, name, email) {
  if (!id) throw new Error("ID is required");
  const user = db.findById("users", id);
  if (!user) throw new Error("User not found");
  return db.update("users", id, { name, email });
}

function deleteUser(id) {
  if (!id) throw new Error("ID is required");
  const user = db.findById("users", id);
  if (!user) throw new Error("User not found");
  return db.delete("users", id);
}

module.exports = { createUser, getUserById, getAllUsers, updateUser, deleteUser };
