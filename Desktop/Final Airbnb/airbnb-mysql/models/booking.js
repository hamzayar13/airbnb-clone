const db = require("../utils/databaseUtil");

// Get all bookings for a guest
const findByGuestId = async (guestId) => {
  const [rows] = await db.query(
    `SELECT b.*, h.houseName, h.price, h.location, h.photo, h.rating 
     FROM bookings b 
     JOIN homes h ON b.property_id = h.id 
     WHERE b.guest_id = ? 
     ORDER BY b.booking_date DESC`,
    [guestId],
  );
  return rows;
};

// Get a specific booking
const findById = async (bookingId) => {
  const [rows] = await db.query(
    `SELECT b.*, h.houseName, h.price, h.location, h.photo, h.description 
     FROM bookings b 
     JOIN homes h ON b.property_id = h.id 
     WHERE b.booking_id = ?`,
    [bookingId],
  );
  return rows[0] || null;
};

// Create a new booking
const create = async ({
  property_id,
  guest_id,
  check_in_date,
  check_out_date,
  total_price,
  status,
}) => {
  const [result] = await db.query(
    `INSERT INTO bookings (property_id, guest_id, check_in_date, check_out_date, total_price, status) 
     VALUES (?, ?, ?, ?, ?, ?)`,
    [
      property_id,
      guest_id,
      check_in_date,
      check_out_date,
      total_price,
      status || "confirmed",
    ],
  );
  return result.insertId;
};

// Cancel a booking
const cancel = async (bookingId) => {
  await db.query(
    "UPDATE bookings SET status = 'cancelled' WHERE booking_id = ?",
    [bookingId],
  );
};

// Get all bookings for a host's properties
const findByHostId = async (hostId) => {
  const [rows] = await db.query(
    `SELECT b.*, h.houseName, h.photo, CONCAT(u.firstName, ' ', u.lastName) as guest_name, u.email as guest_email
     FROM bookings b 
     JOIN homes h ON b.property_id = h.id 
     JOIN users u ON b.guest_id = u.id
     WHERE h.host_id = ? 
     ORDER BY b.check_in_date DESC`,
    [hostId],
  );
  return rows;
};

module.exports = { findByGuestId, findByHostId, findById, create, cancel };
