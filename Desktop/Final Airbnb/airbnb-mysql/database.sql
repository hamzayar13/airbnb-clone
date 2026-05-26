-- ================================================
-- Airbnb Clone - MySQL Database Schema
-- Run this file in MySQL before starting the app
-- ================================================

-- Create and use the database
CREATE DATABASE IF NOT EXISTS `Airbnb project`;
USE `Airbnb project`;

-- -----------------------------------------------
-- Table: users
-- -----------------------------------------------
CREATE TABLE IF NOT EXISTS users (
  id          INT AUTO_INCREMENT PRIMARY KEY,
  firstName   VARCHAR(100)                    NOT NULL,
  lastName    VARCHAR(100)                    DEFAULT '',
  email       VARCHAR(255)                    NOT NULL UNIQUE,
  password    VARCHAR(255)                    NOT NULL,
  userType    ENUM('guest', 'host')           NOT NULL DEFAULT 'guest',
  createdAt   TIMESTAMP                       DEFAULT CURRENT_TIMESTAMP
);

-- -----------------------------------------------
-- Table: homes
-- -----------------------------------------------
CREATE TABLE IF NOT EXISTS homes (
  id          INT AUTO_INCREMENT PRIMARY KEY,
  houseName   VARCHAR(255)                    NOT NULL,
  price       DECIMAL(10, 2)                  NOT NULL,
  location    VARCHAR(255)                    NOT NULL,
  rating      DECIMAL(3, 1)                   NOT NULL,
  photo       VARCHAR(500)                    DEFAULT NULL,
  description TEXT                            DEFAULT NULL,
  createdAt   TIMESTAMP                       DEFAULT CURRENT_TIMESTAMP
);

-- -----------------------------------------------
-- Table: bookings
-- -----------------------------------------------
CREATE TABLE IF NOT EXISTS bookings (
  booking_id      INT AUTO_INCREMENT PRIMARY KEY,
  property_id     INT NOT NULL,
  guest_id        INT NOT NULL,
  check_in_date   DATE NOT NULL,
  check_out_date  DATE NOT NULL,
  total_price     DECIMAL(10, 2) NOT NULL,
  status          ENUM('confirmed', 'pending', 'cancelled') DEFAULT 'confirmed',
  booking_date    TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (property_id) REFERENCES homes(id) ON DELETE CASCADE,
  FOREIGN KEY (guest_id) REFERENCES users(id) ON DELETE CASCADE
);

-- -----------------------------------------------
-- Table: favourites  (many-to-many: users <-> homes)
-- -----------------------------------------------
CREATE TABLE IF NOT EXISTS favourites (
  id        INT AUTO_INCREMENT PRIMARY KEY,
  userId    INT NOT NULL,
  homeId    INT NOT NULL,
  UNIQUE KEY unique_favourite (userId, homeId),
  FOREIGN KEY (userId) REFERENCES users(id)  ON DELETE CASCADE,
  FOREIGN KEY (homeId) REFERENCES homes(id)  ON DELETE CASCADE
);
