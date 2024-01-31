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


test('GET /cart', async () => {
    const res = await request(app)
    .get('/cart')
    .set('Authorization', `Bearer ${token}`);
    expect(res.status).toBe(200);
    expect(res.body).toBeInstanceOf(Array);
});

test('POST /cart', async () => {
    const productsCart = {
        quantity: 5
    }
    const res = await request(app)
    .post('/cart')
    .send(productsCart)
    .set('Authorization', `Bearer ${token}`);
    id = res.body.id;
    expect(res.status).toBe(201);
    expect(res.body.quantity).toBe(productsCart.quantity);
    expect(res.body.id).toBeDefined();
});

test('PUT /cart/:id', async () => {
    const productCartUpdated = {
        quantity: 6,
    }
    const res = await request(app)
    .put(`/cart/${id}`)
    .send(productCartUpdated)
    .set('Authorization', `Bearer ${token}`);
    expect(res.status).toBe(200);
    expect(res.body.quantity).toBe(productCartUpdated.quantity);
});

test('DELETE /productsCart/:id', async () => {
    const res = await request(app)
    .delete(`/cart/${id}`)
    .set('Authorization', `Bearer ${token}`);
    expect(res.status).toBe(204);
});

