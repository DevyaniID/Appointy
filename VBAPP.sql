-- Create database
CREATE DATABASE VBapp;
USE VBapp;

-- Users table (common for both users & providers)
CREATE TABLE users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(100) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,   -- store hashed password
    role ENUM('user', 'provider') NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Providers table (extra details linked to users)
CREATE TABLE providers (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    service_type VARCHAR(100) NOT NULL,
    designation VARCHAR(100),
    location VARCHAR(255),
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

-- Services table (master list of services)
CREATE TABLE services (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL UNIQUE,
    description TEXT
);

-- Add some services
INSERT INTO services (name, description) 
VALUES 
('Doctor', 'Healthcare professionals'),
('Salon', 'Beauty and grooming'),
('Therapist', 'Mental health & wellness'),
('Lawyer', 'Legal services');


-- -- Appointments table
-- CREATE TABLE appointments (
--     id INT AUTO_INCREMENT PRIMARY KEY,
--     user_id INT NOT NULL,
--     provider_id INT NOT NULL,
--     appointment_date DATE NOT NULL,
--     time_slot VARCHAR(50) NOT NULL,
--     description TEXT,
--     status ENUM('pending', 'confirmed', 'cancelled', 'completed') DEFAULT 'pending',
--     created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
--     FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
--     FOREIGN KEY (provider_id) REFERENCES providers(id) ON DELETE CASCADE
-- );
