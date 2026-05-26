const db = require("../utils/databaseUtil");

// Get all homes
const findAll = async () => {
  const [rows] = await db.query("SELECT * FROM homes");
  return rows;
};

// Get one home by ID
const findById = async (id) => {
  const [rows] = await db.query("SELECT * FROM homes WHERE id = ?", [id]);
  return rows[0] || null;
};

// Create a new home
const create = async ({
  houseName,
  price,
  location,
  rating,
  photo,
  description,
  hostId,
}) => {
  const [result] = await db.query(
    "INSERT INTO homes (houseName, price, location, rating, photo, description, host_id) VALUES (?, ?, ?, ?, ?, ?, ?)",
    [
      houseName,
      price,
      location,
      rating,
      photo || null,
      description || null,
      hostId,
    ],
  );
  return result.insertId;
};

// Update an existing home
const update = async (
  id,
  { houseName, price, location, rating, description, photo },
) => {
  if (photo) {
    await db.query(
      "UPDATE homes SET houseName=?, price=?, location=?, rating=?, description=?, photo=? WHERE id=?",
      [houseName, price, location, rating, description, photo, id],
    );
  } else {
    await db.query(
      "UPDATE homes SET houseName=?, price=?, location=?, rating=?, description=? WHERE id=?",
      [houseName, price, location, rating, description, id],
    );
  }
};

// Delete a home and return its data (so we can delete its photo file)
const deleteById = async (id) => {
  const home = await findById(id);
  await db.query("DELETE FROM homes WHERE id = ?", [id]);
  return home;
};

module.exports = { findAll, findById, create, update, deleteById };
