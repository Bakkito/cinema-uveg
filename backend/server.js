
require('dotenv').config();

const express = require('express');
const mariadb = require('mariadb');
const cors = require('cors');

const app = express();
const PORT = Number(process.env.PORT) || 3000;

app.use(cors({
  origin: ['http://localhost:4200', 'http://localhost:8080']
}));
app.use(express.json({ limit: '10kb' }));

const pool = mariadb.createPool({
  host: process.env.DB_HOST || '127.0.0.1',
  port: Number(process.env.DB_PORT) || 3307,
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || '',
  database: process.env.DB_NAME || 'cinema_uveg',
  connectionLimit: 5
});

app.get('/api/health', async (req, res) => {
  let connection;

  try {
    connection = await pool.getConnection();
    const rows = await connection.query(
      'SELECT VERSION() AS version, DATABASE() AS database_name'
    );

    res.json({
      status: 'ok',
      database: rows[0].database_name,
      version: rows[0].version
    });
  } catch (error) {
    console.error('Error de conexión:', error.message);
    res.status(500).json({ message: 'Error de conexión con la base de datos' });
  } finally {
    if (connection) connection.release();
  }
});

app.get('/api/favoritas', async (req, res) => {
  let connection;

  try {
    connection = await pool.getConnection();
    const rows = await connection.query(
      `SELECT id, tmdb_id, titulo, poster_path, fecha_agregado
       FROM favoritas
       ORDER BY fecha_agregado DESC`
    );

    res.json(rows);
  } catch (error) {
    console.error('Error al consultar favoritas:', error.message);
    res.status(500).json({ message: 'No se pudieron consultar los favoritos' });
  } finally {
    if (connection) connection.release();
  }
});

app.post('/api/favoritas', async (req, res) => {
  const { tmdb_id, titulo, poster_path } = req.body;

  if (
    !Number.isInteger(tmdb_id) ||
    tmdb_id <= 0 ||
    typeof titulo !== 'string' ||
    !titulo.trim() ||
    titulo.length > 255 ||
    (poster_path != null &&
      (typeof poster_path !== 'string' || poster_path.length > 255))
  ) {
    return res.status(400).json({
      message: 'Los datos de la película no son válidos'
    });
  }

  let connection;

  try {
    connection = await pool.getConnection();

    const result = await connection.query(
      `INSERT INTO favoritas (tmdb_id, titulo, poster_path)
       VALUES (?, ?, ?)`,
      [tmdb_id, titulo.trim(), poster_path || null]
    );

    res.status(201).json({
      message: 'Película agregada a favoritos',
      id: Number(result.insertId),
      tmdb_id,
      titulo: titulo.trim(),
      poster_path: poster_path || null
    });
  } catch (error) {
    if (error.code === 'ER_DUP_ENTRY') {
      return res.status(409).json({
        message: 'Esta película ya está en favoritos'
      });
    }

    console.error('Error al guardar favorito:', error.message);
    res.status(500).json({ message: 'No se pudo guardar el favorito' });
  } finally {
    if (connection) connection.release();
  }
});

app.delete('/api/favoritas/:tmdb_id', async (req, res) => {
  const tmdbId = Number(req.params.tmdb_id);

  if (!Number.isInteger(tmdbId) || tmdbId <= 0) {
    return res.status(400).json({ message: 'Identificador no válido' });
  }

  let connection;

  try {
    connection = await pool.getConnection();

    const result = await connection.query(
      'DELETE FROM favoritas WHERE tmdb_id = ?',
      [tmdbId]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({
        message: 'La película no está en favoritos'
      });
    }

    res.json({ message: 'Película eliminada de favoritos' });
  } catch (error) {
    console.error('Error al eliminar favorito:', error.message);
    res.status(500).json({ message: 'No se pudo eliminar el favorito' });
  } finally {
    if (connection) connection.release();
  }
});

app.listen(PORT, () => {
  console.log(`Cinema UVEG API disponible en http://localhost:${PORT}`);
});

process.on('SIGINT', async () => {
  await pool.end();
  process.exit(0);
});
