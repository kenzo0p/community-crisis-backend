import request from 'supertest';
import { app } from '..';
import { Prisma } from '../utils/Prisma';
import { after } from 'node:test';
describe('Auth Endpoints', () => {
  beforeAll(async () => {
    //clear test Db
    await Prisma.user.deleteMany();
  });

  afterAll(async () => {
    await Prisma.$disconnect();
  });

  (it('Should register a user', async () => {
    const res = await request(app).post('/api/v1/auth/signup').send({
      name: 'Test User',
      email: 'test@example.com',
      password: 'yourPassword',
      mobile: '9876543210',
      role: 'CITIZEN',
    });

    expect(res.statusCode).toBe(201);
    expect(res.body.success).toBe(true);
    expect(res.body.data.user).toHaveProperty('id');
  }),
    it('should  not register with missing fields', async () => {
      const res = await request(app).post('/api/v1/auth/signup').send({
        email: 'test@example.com',
        password: 'yourPassword',
      });
      expect(res.statusCode).toBe(400);
      expect(res.body.success).toBe(false);
    }));

  it('Should login the User', async () => {
    const res = await request(app).post('/api/v1/auth/login').send({
      email: 'test@example.com',
      password: 'yourPassword',
    });

    expect(res.statusCode).toBe(200);
    expect(res.body.success).toBe(true);
  });
});
