require('dotenv').config();
const express = require('express');
const { Pool } = require('pg');
const cors = require('cors');

const app = express();
app.use(cors());


if (require.main === module) {
  const PORT = process.env.PORT || 3000;
  app.listen(PORT, () => {
    console.log('Server running on http://localhost:3000');
  });
}


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

// Rutas para obtener las tiendas
app.get('/shops', async (req, res) => {
  try {
    const client = await pool.connect();
    const result = await client.query('SELECT * FROM "Shops"');
    res.json(result.rows);
    client.release();
  } catch (err) {
    console.error(err);
    res.status(500).send('Error al obtener las tiendas');
  }
});

app.get('/components', async (req, res) => {
  const { 
    name = '*',
    page = 1,
    limit = 10,
    category = '*',
    brand = '*',
    shop = '*',
    minPrice = 0,
    maxPrice = Number.MAX_SAFE_INTEGER
  } = req.query; 
  const offset = (page - 1) * limit;

  try {
    const client = await pool.connect();
    const result = await client.query(
      `SELECT * 
       FROM "Components" 
       WHERE 
         ($1 = '%*%' OR name ILIKE $1) AND
         ($3 = '*' OR "categoryName" = $3) AND
         ($4 = '*' OR "brandName" = $4) AND
         ($5 = '*' OR "shopName" = $5) AND
         price BETWEEN $6 AND $7
       ORDER BY id
       LIMIT $2 OFFSET $8`,
      [`%${name}%`, parseInt(limit), category, brand, shop, parseInt(minPrice), parseInt(maxPrice), offset]
    );
    res.json(result.rows);
    client.release();
  } catch (err) {
    console.error(err);
    res.status(500).send('Error al buscar componentes');
  }
});

app.get('/components/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const client = await pool.connect();
    const result = await client.query('SELECT * FROM "Components" WHERE id = $1', [id]);
    if (result.rows.length === 0) {
      res.status(404).send('Componente no encontrado');
    } else {
      res.json(result.rows[0]);
    }
    client.release();
  } catch (err) {
    console.error(err);
    res.status(500).send('Error al buscar el componente');
  }
});

// Manejo de errores para rutas no encontradas
app.use((req, res) => {
  res.status(404).send('Ruta no encontrada');
});


module.exports = app;