import request from 'supertest';
import { app } from '../src/index';

describe('Auth Endpoints', () => {
  it('should register a new user', async () => {
    const res = await request(app)
      .post('/auth/register')
      .send({ email: 'testuser@example.com', password: 'testpass', role: 'customer' });
    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty('token');
  });

  it('should not register duplicate user', async () => {
    await request(app)
      .post('/auth/register')
      .send({ email: 'dupe@example.com', password: 'testpass', role: 'customer' });
    const res = await request(app)
      .post('/auth/register')
      .send({ email: 'dupe@example.com', password: 'testpass', role: 'customer' });
    expect(res.statusCode).toBe(409);
  });

  it('should login with correct credentials', async () => {
    await request(app)
      .post('/auth/register')
      .send({ email: 'loginuser@example.com', password: 'testpass', role: 'customer' });
    const res = await request(app)
      .post('/auth/login')
      .send({ email: 'loginuser@example.com', password: 'testpass' });
    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty('token');
  });

  it('should not login with wrong password', async () => {
    await request(app)
      .post('/auth/register')
      .send({ email: 'wrongpass@example.com', password: 'testpass', role: 'customer' });
    const res = await request(app)
      .post('/auth/login')
      .send({ email: 'wrongpass@example.com', password: 'wrong' });
    expect(res.statusCode).toBe(401);
  });
}); 