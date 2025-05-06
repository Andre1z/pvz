-- Creación de la base de datos
CREATE DATABASE IF NOT EXISTS pvz;
USE pvz;

-- Tabla de usuarios (opcional, si deseas que los jugadores tengan cuentas)
CREATE TABLE IF NOT EXISTS users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(50) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL, -- Se recomienda usar hashing para contraseñas
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Tabla de partidas guardadas
CREATE TABLE IF NOT EXISTS game_sessions (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT, -- Relación con la tabla de usuarios (puede ser NULL para jugadores anónimos)
    level INT NOT NULL,
    sun_amount INT NOT NULL,
    plants TEXT NOT NULL, -- JSON con la disposición de las plantas en el tablero
    zombies TEXT NOT NULL, -- JSON con la disposición de los zombis
    last_updated TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE SET NULL
);

-- Tabla de puntuaciones
CREATE TABLE IF NOT EXISTS scores (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT, -- Relación con la tabla de usuarios
    score INT NOT NULL,
    level INT NOT NULL,
    played_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);