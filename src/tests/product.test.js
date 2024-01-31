const request = require('supertest');
const app = require('../app');
require('../models')

let id;
let token;

beforeAll(async () => {
    const credentials = {
        email: "test@gmail.com",
        password: "test1234"
    }
    const res = await request(app).post('/users/login').send(credentials);
    token = res.body.token;
});


test('GET /products', async () => {
    const res = await request(app).get('/products');
    expect(res.status).toBe(200);
    expect(res.body).toBeInstanceOf(Array);
});

test('POST /products', async () => {
    const products = {
        title: "test title",
        description: "test descrition",
        brand: "test brand",
        price: "1050,00"
    }
    const res = await request(app)
    .post('/products')
    .send(products)
    .set('Authorization', `Bearer ${token}`);
    id = res.body.id;
    expect(res.status).toBe(201);
    expect(res.body.title).toBe(products.title);
    expect(res.body.id).toBeDefined();
});

test('GET ONE /products/:id', async () => {
    const res = await request(app).get(`/products/${id}`);
    expect(res.status).toBe(200);
});

test('PUT /products/:id', async () => {
    const productUpdated = {
        title: "test title actualizado",
    }
    const res = await request(app)
    .put(`/products/${id}`)
    .send(productUpdated)
    .set('Authorization', `Bearer ${token}`);
    expect(res.status).toBe(200);
    expect(res.body.title).toBe(productUpdated.title);
});

test('DELETE /products/:id', async () => {
    const res = await request(app)
    .delete(`/products/${id}`)
    .set('Authorization', `Bearer ${token}`);
    expect(res.status).toBe(204);
});

