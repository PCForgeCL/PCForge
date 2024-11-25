require('dotenv').config();
const express = require('express');
const { Pool } = require('pg');

const app = express();
const PORT = process.env.PORT || 3000;

// PostgreSQL connection setup using environment variables
const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
});

// Middleware
app.use(express.json());

// Home route
app.get('/', async (req, res) => {
  try {
    const client = await pool.connect();
    const result = await client.query('SELECT NOW()');
    res.send(`¡Hola desde Express! La hora actual es: ${result.rows[0].now}`);
    client.release();
  } catch (err) {
    console.error(err);
    res.status(500).send('Error al conectar a la base de datos');
  }
});

// Rutas para obtener todas las marcas
app.get('/brands', async (req, res) => {
  try {
    const client = await pool.connect();
    const result = await client.query('SELECT * FROM "Brands"');
    res.json(result.rows);
    client.release();
  } catch (err) {
    console.error(err);
    res.status(500).send('Error al obtener las marcas');
  }
});

// Rutas para obtener todas las categorías
app.get('/categories', async (req, res) => {
  try {
    const client = await pool.connect();
    const result = await client.query('SELECT * FROM "Categories"');
    res.json(result.rows);
    client.release();
  } catch (err) {
    console.error(err);
    res.status(500).send('Error al obtener las categorías');
  }
});

// Rutas para obtener todos los componentes
app.get('/components', async (req, res) => {
  const { page = 1, limit = 10 } = req.query; // Paginación
  const offset = (page - 1) * limit;

  try {
    const client = await pool.connect();
    const result = await client.query(
      'SELECT * FROM "Components" ORDER BY id LIMIT $1 OFFSET $2',
      [parseInt(limit), offset]
    );
    res.json(result.rows);
    client.release();
  } catch (err) {
    console.error(err);
    res.status(500).send('Error al obtener los componentes');
  }
});

// Rutas para obtener componentes por categoría
app.get('/components/category/:name', async (req, res) => {
  try {
    const client = await pool.connect();
    const result = await client.query(
      'SELECT * FROM "Components" WHERE "categoryName" = $1',
      [req.params.name]
    );
    res.json(result.rows);
    client.release();
  } catch (err) {
    console.error(err);
    res.status(500).send('Error al obtener componentes por categoría');
  }
});

// Rutas para obtener componentes por marca
app.get('/components/brand/:name', async (req, res) => {
  try {
    const client = await pool.connect();
    const result = await client.query(
      'SELECT * FROM "Components" WHERE "brandName" = $1',
      [req.params.name]
    );
    res.json(result.rows);
    client.release();
  } catch (err) {
    console.error(err);
    res.status(500).send('Error al obtener componentes por marca');
  }
});

// Rutas para filtrar componentes por rango de precios
app.get('/components/price', async (req, res) => {
  const { min = 0, max = Number.MAX_SAFE_INTEGER } = req.query;

  try {
    const client = await pool.connect();
    const result = await client.query(
      'SELECT * FROM "Components" WHERE price BETWEEN $1 AND $2 ORDER BY price ASC',
      [parseInt(min), parseInt(max)]
    );
    res.json(result.rows);
    client.release();
  } catch (err) {
    console.error(err);
    res.status(500).send('Error al filtrar componentes por precio');
  }
});

// Rutas para buscar componentes por nombre (búsqueda básica)
app.get('/components/search', async (req, res) => {
  const { name } = req.query;

  if (!name) {
    return res.status(400).send('Debes proporcionar un término de búsqueda');
  }

  try {
    const client = await pool.connect();
    const result = await client.query(
      'SELECT * FROM "Components" WHERE name ILIKE $1',
      [`%${name}%`]
    );
    res.json(result.rows);
    client.release();
  } catch (err) {
    console.error(err);
    res.status(500).send('Error al buscar componentes');
  }
});

// Manejo de errores para rutas no encontradas
app.use((req, res) => {
  res.status(404).send('Ruta no encontrada');
});

// Iniciar el servidor
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
