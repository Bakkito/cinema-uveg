
CREATE DATABASE IF NOT EXISTS cinema_uveg
  CHARACTER SET utf8mb4
  COLLATE utf8mb4_unicode_ci;

USE cinema_uveg;

CREATE TABLE IF NOT EXISTS favoritas (
  id INT AUTO_INCREMENT PRIMARY KEY,
  tmdb_id INT NOT NULL UNIQUE,
  titulo VARCHAR(255) NOT NULL,
  poster_path VARCHAR(255) NULL,
  fecha_agregado TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_favoritas_titulo
  ON favoritas (titulo);
