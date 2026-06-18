const request = require('supertest');
const mongoose = require('mongoose');
const app = require('../src/app');

const TEST_DB = 'mongodb://localhost:27017/propspace_test';

beforeAll(async () => {
  await mongoose.connect(TEST_DB);
});

afterAll(async () => {
  await mongoose.connection.dropDatabase();
  await mongoose.disconnect();
});

afterEach(async () => {
  const collections = mongoose.connection.collections;
  for (const key in collections) {
    await collections[key].deleteMany({});
  }
});

describe('Auth — register', () => {
  it('registers a new user and sets cookie', async () => {
    const res = await request(app).post('/api/auth/register').send({
      username: 'testuser',
      email: 'test@example.com',
      password: 'password123',
    });
    expect(res.status).toBe(201);
    expect(res.body.user).toBeDefined();
    expect(res.body.user.password).toBeUndefined();
    expect(res.headers['set-cookie']).toBeDefined();
  });

  it('rejects duplicate email with 400', async () => {
    await request(app).post('/api/auth/register').send({
      username: 'userA',
      email: 'dupe@example.com',
      password: 'password123',
    });
    const res = await request(app).post('/api/auth/register').send({
      username: 'userB',
      email: 'dupe@example.com',
      password: 'password123',
    });
    expect(res.status).toBe(400);
  });

  it('rejects weak password with 400', async () => {
    const res = await request(app).post('/api/auth/register').send({
      username: 'userC',
      email: 'userC@example.com',
      password: '123',
    });
    expect(res.status).toBe(400);
  });
});

describe('Auth — login', () => {
  beforeEach(async () => {
    await request(app).post('/api/auth/register').send({
      username: 'loginuser',
      email: 'login@example.com',
      password: 'password123',
    });
  });

  it('logs in with correct credentials', async () => {
    const res = await request(app)
      .post('/api/auth/login')
      .send({ email: 'login@example.com', password: 'password123' });
    expect(res.status).toBe(200);
    expect(res.body.user).toBeDefined();
    expect(res.headers['set-cookie']).toBeDefined();
  });

  it('returns 401 for wrong password', async () => {
    const res = await request(app)
      .post('/api/auth/login')
      .send({ email: 'login@example.com', password: 'wrongpass' });
    expect(res.status).toBe(401);
  });
});

describe('Auth — protected route', () => {
  it('returns 401 with no token', async () => {
    const res = await request(app).get('/api/auth/me');
    expect(res.status).toBe(401);
  });

  it('returns user info with valid token cookie', async () => {
    const reg = await request(app).post('/api/auth/register').send({
      username: 'meuser',
      email: 'me@example.com',
      password: 'password123',
    });
    const cookie = reg.headers['set-cookie'];
    const res = await request(app).get('/api/auth/me').set('Cookie', cookie);
    expect(res.status).toBe(200);
    expect(res.body.user.email).toBe('me@example.com');
  });
});

describe('Auth — change password', () => {
  let cookie;
  beforeEach(async () => {
    const reg = await request(app).post('/api/auth/register').send({
      username: 'pwuser',
      email: 'pw@example.com',
      password: 'oldpassword',
    });
    cookie = reg.headers['set-cookie'];
  });

  it('changes password successfully with correct old password', async () => {
    const res = await request(app)
      .put('/api/auth/change-password')
      .set('Cookie', cookie)
      .send({ oldPassword: 'oldpassword', newPassword: 'newpassword123' });
    expect(res.status).toBe(200);
  });

  it('rejects with 401 when old password is wrong', async () => {
    const res = await request(app)
      .put('/api/auth/change-password')
      .set('Cookie', cookie)
      .send({ oldPassword: 'wrongold', newPassword: 'newpassword123' });
    expect(res.status).toBe(401);
  });
});
