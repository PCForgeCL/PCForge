require('dotenv').config({
  path: '.env.tests',
});

const request = require('supertest');
const app = require('../');

describe('API Endpoints Unit Testing', () => {
  // Test para la ruta '/'
  it('should return the current date and time', async () => {
    const response = await request(app).get('/');
    expect(response.status).toBe(200);
    expect(response.text).toContain('¡Hola desde Express!');
  });

  // Test para la ruta '/brands'
  it('should return a list of brands', async () => {
    const response = await request(app).get('/brands');
    expect(response.status).toBe(200);
    expect(Array.isArray(response.body)).toBe(true); // Verifica que sea un array
  });

  // Test para la ruta '/categories'
  it('should return a list of categories', async () => {
    const response = await request(app).get('/categories');
    expect(response.status).toBe(200);
    expect(Array.isArray(response.body)).toBe(true); // Verifica que sea un array
  });

  // Test para la ruta '/shops'
  it('should return a list of shops', async () => {
    const response = await request(app).get('/shops');
    expect(response.status).toBe(200);
    expect(Array.isArray(response.body)).toBe(true); // Verifica que sea un array
  });

  // Test para la ruta '/components'
  it('should return a filtered list of components', async () => {
    const response = await request(app)
      .get('/components')
      .query({ name: 'processor', page: 1, limit: 10, category: 'CPU' });
    expect(response.status).toBe(200);
    expect(Array.isArray(response.body)).toBe(true); // Verifica que sea un array
  });

  // Test para la ruta '/components/:id'
  it('should return a single component by ID', async () => {
    const components_response = await request(app).get('/components');
    const componentId = components_response.body[0].id;
    const response = await request(app).get(`/components/${componentId}`);
    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('id', componentId);
  });

  it('should return 404 when component is not found', async () => {
    const response = await request(app).get('/components/999999'); // ID no existente
    expect(response.status).toBe(404);
    expect(response.text).toBe('Componente no encontrado');
  });

  // Test para manejar rutas no encontradas
  it('should return 404 for unknown routes', async () => {
    const response = await request(app).get('/unknownroute');
    expect(response.status).toBe(404);
    expect(response.text).toBe('Ruta no encontrada');
  });

});
