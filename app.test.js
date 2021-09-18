const request = require('supertest');
const app = require('./app');

describe('Todos API' , () => {
    it('GET /todos --> array todos', () => {
        return request(app)
            .get('/todos')
            .expect('Content-type', /json/)
            .expect(200)
            .then(res => {
                expect(res.body).toEqual(
                    expect.arrayContaining([
                        expect.objectContaining({
                            id: expect.any(Number),
                            name: expect.any(String),
                            completed: expect.any(Boolean),
                        })
                    ])
                )
            })
    });
    it('GET /todos/id --> array todo by ID', () => {
        return request(app)
            .get('/todos/1')
            .expect('Content-type', /json/)
            .expect(200)
            .then(res => {
                expect(res.body).toEqual(
                    expect.objectContaining({
                        name: expect.any(String),
                        completed: expect.any(Boolean),
                    })
                )
            })
    });
    it('GET /todos/id --> 404 if not found', () => {
        return request(app).get('/todos/999999').expect(404);
    });
    it('POST /todos --> created todo', () => {
        return request(app)
            .post('/todos')
            .send({
                name: 'do dishes'
            })
            .expect('Content-type', /json/)
            .expect(201)
            .then(res => {
                expect(res.body).toEqual(
                    expect.objectContaining({
                        name: expect.any(String),
                        completed: false
                    })
                )
            })
    });
    it('POST /todos --> validates request body', () => {
        return request(app)
            .post('/todos')
            .send({ name: 123 })
            .expect(422);
    });
})
