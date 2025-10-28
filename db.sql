create database vbapp;
use vbapp; 
-- Create database
CREATE DATABASE IF NOT EXISTS vbapp;
USE vbapp;

-- Users table
CREATE TABLE IF NOT EXISTS users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    role ENUM('user', 'provider') DEFAULT 'user',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Providers table (for service providers)
CREATE TABLE IF NOT EXISTS providers (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    service_type VARCHAR(100) NOT NULL,
    designation VARCHAR(100),
    location VARCHAR(255) NOT NULL,
    bio TEXT,
    experience_years INT,
    hourly_rate DECIMAL(10,2),
    is_verified BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    UNIQUE KEY unique_user_provider (user_id)
);

-- Services table (available service types)
CREATE TABLE IF NOT EXISTS services (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    description TEXT,
    category ENUM('medical', 'beauty', 'legal', 'therapy') NOT NULL,
    icon VARCHAR(50),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Appointments table
CREATE TABLE IF NOT EXISTS appointments (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    provider_id INT NOT NULL,
    service_type VARCHAR(100) NOT NULL,
    appointment_date DATE NOT NULL,
    appointment_time TIME NOT NULL,
    duration_minutes INT DEFAULT 60,
    status ENUM('pending', 'confirmed', 'completed', 'cancelled') DEFAULT 'pending',
    notes TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (provider_id) REFERENCES providers(id) ON DELETE CASCADE
);

-- Provider availability table
CREATE TABLE IF NOT EXISTS provider_availability (
    id INT AUTO_INCREMENT PRIMARY KEY,
    provider_id INT NOT NULL,
    day_of_week ENUM('monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday') NOT NULL,
    start_time TIME NOT NULL,
    end_time TIME NOT NULL,
    is_available BOOLEAN DEFAULT TRUE,
    FOREIGN KEY (provider_id) REFERENCES providers(id) ON DELETE CASCADE
);

-- Reviews table
CREATE TABLE IF NOT EXISTS reviews (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    provider_id INT NOT NULL,
    appointment_id INT NOT NULL,
    rating INT CHECK (rating >= 1 AND rating <= 5),
    comment TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (provider_id) REFERENCES providers(id) ON DELETE CASCADE,
    FOREIGN KEY (appointment_id) REFERENCES appointments(id) ON DELETE CASCADE
);

-- Insert sample services
INSERT INTO services (name, description, category, icon) VALUES
('Doctor', 'Medical consultation and healthcare services', 'medical', '👩‍⚕️'),
('Salon', 'Beauty, hair, and grooming services', 'beauty', '✂️'),
('Lawyer', 'Legal consultation and services', 'legal', '⚖️'),
('Therapist', 'Mental health and wellness services', 'therapy', '❤️');

-- Insert sample users (passwords are hashed with bcrypt)
-- Default password for all sample users: 'password123'
INSERT INTO users (name, email, password, role) VALUES
('John Doe', 'john.doe@email.com', '$2b$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 'user'),
('Dr. Sarah Johnson', 'sarah.johnson@email.com', '$2b$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 'provider'),
('Maria Gonzalez', 'maria.gonzalez@email.com', '$2b$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 'provider'),
('Jennifer Adams', 'jennifer.adams@email.com', '$2b$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 'provider'),
('Dr. Rachel Green', 'rachel.green@email.com', '$2b$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 'provider');

-- Insert sample providers
INSERT INTO providers (user_id, service_type, designation, location, bio, experience_years, hourly_rate, is_verified) VALUES
(2, 'Doctor', 'Medical Doctor', 'Downtown Medical Center', 'Experienced medical professional with 10+ years in healthcare', 10, 150.00, TRUE),
(3, 'Salon', 'Master Hair Stylist', 'Studio Belle Salon', 'Specialized in hair cutting, coloring, and extensions', 8, 80.00, TRUE),
(4, 'Lawyer', 'Family Law Attorney', 'Adams & Associates Law Firm', 'Expert in family law with focus on divorce and child custody', 12, 200.00, TRUE),
(5, 'Therapist', 'Licensed Clinical Psychologist', 'Mindful Wellness Center', 'Specialized in anxiety, depression, and cognitive behavioral therapy', 7, 120.00, TRUE);

-- Insert sample provider availability
INSERT INTO provider_availability (provider_id, day_of_week, start_time, end_time) VALUES
(1, 'monday', '09:00:00', '17:00:00'),
(1, 'tuesday', '09:00:00', '17:00:00'),
(1, 'wednesday', '09:00:00', '17:00:00'),
(1, 'thursday', '09:00:00', '17:00:00'),
(1, 'friday', '09:00:00', '17:00:00'),
(2, 'monday', '10:00:00', '18:00:00'),
(2, 'tuesday', '10:00:00', '18:00:00'),
(2, 'wednesday', '10:00:00', '18:00:00'),
(2, 'thursday', '10:00:00', '18:00:00'),
(2, 'friday', '10:00:00', '18:00:00'),
(2, 'saturday', '09:00:00', '16:00:00');