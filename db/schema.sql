-- Orthopaedic clinic website: database setup
--
-- Run this once as a MySQL administrator:
--   sudo mysql < db/schema.sql
--
-- Then create the app's own user with the two commands at the end of this file.

CREATE DATABASE IF NOT EXISTS clinic_website
  CHARACTER SET utf8mb4
  COLLATE utf8mb4_unicode_ci;

USE clinic_website;

CREATE TABLE IF NOT EXISTS appointments (
  id          INT UNSIGNED NOT NULL AUTO_INCREMENT,
  full_name   VARCHAR(80)  NOT NULL,
  phone       VARCHAR(20)  NOT NULL,
  concern     VARCHAR(500) NULL,
  status      ENUM('new', 'called', 'booked', 'closed') NOT NULL DEFAULT 'new',
  created_at  TIMESTAMP    NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (id),
  KEY idx_appointments_created_at (created_at)
) ENGINE=InnoDB;

-- The app gets its own user with only the rights it needs on this one table.
-- Create it yourself so the password is never written in a file. Pick a long
-- random password and put the same one in .env as DB_PASSWORD:
--
--   CREATE USER 'clinic_app'@'localhost' IDENTIFIED BY 'your-long-random-password';
--   GRANT SELECT, INSERT, DELETE ON clinic_website.appointments TO 'clinic_app'@'localhost';
