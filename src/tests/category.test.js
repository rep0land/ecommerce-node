const request = require('supertest');
const app = require('../app');

let token;
let id;

beforeAll(async () => {
    const credentials = {
        email: "test@gmail.com",
        password: "test1234"
    }
    const res = await request(app).post('/users/login').send(credentials);
    token = res.body.token;
});

//ENDPOINTS PUBLICOS    

test('GET /categories', async () => {
    const res = await request(app).get('/categories');
    expect(res.status).toBe(200);
    expect(res.body).toBeInstanceOf(Array);
});

//ENDPOINTS PROTEGIDOS

test('POST /cateories', async () => {
    const category = { name: "tech" }
    const res = await request(app)
    .post('/categories')
    .set('Authorization', `Bearer ${token}`)
    .send(category);
    id = res.body.id;
    expect(res.status).toBe(201);
    expect(res.body.name).toBe(category.name);
    expect(res.body.id).toBeDefined();
});

test('PUT /categories/:id', async () => {
    const categoryUpdated = { 
        name: "tech actualizado"
     }
    const res = await request(app)
    .put(`/categories/${id}`)
    .send(categoryUpdated)
    .set('Authorization', `Bearer ${token}`);
    expect(res.status).toBe(200);
    expect(res.body.name).toBe(categoryUpdated.name);
});

test('DELETE /categories/:id', async () => {
    const res = await request(app)
    .delete(`/categories/${id}`)
    .set('Authorization', `Bearer ${token}`);
    expect(res.status).toBe(204);
});

