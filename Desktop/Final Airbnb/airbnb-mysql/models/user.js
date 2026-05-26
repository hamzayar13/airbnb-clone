const db = require("../utils/databaseUtil");

// Find a user by email
const findByEmail = async (email) => {
  const [rows] = await db.query("SELECT * FROM users WHERE email = ?", [email]);
  return rows[0] || null;
};

// Find a user by ID
const findById = async (id) => {
  const [rows] = await db.query("SELECT * FROM users WHERE id = ?", [id]);
  return rows[0] || null;
};

// Create a new user
const create = async ({ firstName, lastName, email, password, userType }) => {
  const [result] = await db.query(
    "INSERT INTO users (firstName, lastName, email, password, userType) VALUES (?, ?, ?, ?, ?)",
    [firstName, lastName || "", email, password, userType]
  );
  return result.insertId;
};

// Get all favourite homes for a user (JOIN with homes table)
const getFavourites = async (userId) => {
  const [rows] = await db.query(
    `SELECT h.* FROM homes h
     INNER JOIN favourites f ON h.id = f.homeId
     WHERE f.userId = ?`,
    [userId]
  );
  return rows;
};

// Add a home to favourites (INSERT IGNORE prevents duplicates)
const addFavourite = async (userId, homeId) => {
  await db.query(
    "INSERT IGNORE INTO favourites (userId, homeId) VALUES (?, ?)",
    [userId, homeId]
  );
};

// Remove a home from favourites
const removeFavourite = async (userId, homeId) => {
  await db.query(
    "DELETE FROM favourites WHERE userId = ? AND homeId = ?",
    [userId, homeId]
  );
};

module.exports = { findByEmail, findById, create, getFavourites, addFavourite, removeFavourite };
