import request from 'supertest';
import { hash } from 'bcrypt';
import { v4 as uuid } from 'uuid';
import { Connection } from 'typeorm';
import { app } from '@shared/infra/http/app';
import createConnection from '@shared/infra/typeorm';

let connection: Connection;

describe('List Categories', () => {
  beforeAll(async () => {
    connection = await createConnection();
    await connection.runMigrations();
    const id = uuid();
    const password = await hash('admin', 8);

    await connection.query(
      //cammelcase precisa de aspas duplas.
      `INSERT INTO USERS (id, name, email, password, "isAdmin", created_at, driver_license) VALUES
      ('${id}', 'admin', 'admin@rentx.com.br', '${password}', true, 'now()', 'XXXXX');
      `
    )
  })

  afterAll(async () => {
    await connection.dropDatabase();
    await connection.close();
  });

  it("should be able to list all available categories", async () => {
    const responseToken = await request(app).post('/sessions').send({
      email: 'admin@rentx.com.br',
      password: 'admin'
    });

    const { refresh_token } = responseToken.body;

    await request(app).post('/categories').send({
      name: 'Category Supertest',
      description: 'Category Description Supertest'
    }).set({
      Authorization: `Bearer ${refresh_token}`,
    });

    const response = await request(app).get('/categories');

    expect(response.status).toBe(200)
    expect(response.body.length).toBe(1);
    expect(response.body[0]).toHaveProperty("id");
    expect(response.body[0].name).toEqual("Category Supertest");
  });

});