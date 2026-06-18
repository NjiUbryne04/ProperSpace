const request = require('supertest');
const mongoose = require('mongoose');
const app = require('../src/app');

const TEST_DB = 'mongodb://localhost:27017/propspace_test';

let ownerCookie, otherCookie, propertyId;

const sampleProperty = {
  title: 'Cozy Studio',
  description: 'A lovely studio in the city center',
  price: 500,
  city: 'Nairobi',
  country: 'Kenya',
  propertyType: 'Studio',
  imageUrls: ['https://example.com/img.jpg'],
};

beforeAll(async () => {
  await mongoose.connect(TEST_DB);

  const r1 = await request(app).post('/api/auth/register').send({
    username: 'owner',
    email: 'owner@example.com',
    password: 'password123',
  });
  ownerCookie = r1.headers['set-cookie'];

  const r2 = await request(app).post('/api/auth/register').send({
    username: 'other',
    email: 'other@example.com',
    password: 'password123',
  });
  otherCookie = r2.headers['set-cookie'];
});

afterAll(async () => {
  await mongoose.connection.dropDatabase();
  await mongoose.disconnect();
});

describe('Properties — public feed', () => {
  it('GET /api/properties returns 200 for guests', async () => {
    const res = await request(app).get('/api/properties');
    expect(res.status).toBe(200);
    expect(res.body.properties).toBeDefined();
  });

  it('filters by city', async () => {
    await request(app)
      .post('/api/properties')
      .set('Cookie', ownerCookie)
      .send(sampleProperty);

    const res = await request(app).get('/api/properties?city=Nairobi');
    expect(res.status).toBe(200);
    expect(res.body.properties.length).toBeGreaterThan(0);
    expect(res.body.properties[0].city).toBe('Nairobi');
  });

  it('filters by price range', async () => {
    const res = await request(app).get('/api/properties?minPrice=100&maxPrice=1000');
    expect(res.status).toBe(200);
  });
});

describe('Properties — CRUD', () => {
  beforeEach(async () => {
    const res = await request(app)
      .post('/api/properties')
      .set('Cookie', ownerCookie)
      .send(sampleProperty);
    propertyId = res.body.property._id;
  });

  afterEach(async () => {
    const Property = mongoose.model('Property');
    await Property.deleteMany({});
  });

  it('creates property with 201 for authenticated user', async () => {
    const res = await request(app)
      .post('/api/properties')
      .set('Cookie', ownerCookie)
      .send(sampleProperty);
    expect(res.status).toBe(201);
    expect(res.body.property.title).toBe(sampleProperty.title);
  });

  it('returns 401 when creating property without auth', async () => {
    const res = await request(app).post('/api/properties').send(sampleProperty);
    expect(res.status).toBe(401);
  });

  it('returns 400 for missing required fields', async () => {
    const res = await request(app)
      .post('/api/properties')
      .set('Cookie', ownerCookie)
      .send({ title: 'Incomplete' });
    expect(res.status).toBe(400);
  });

  it('owner can update their property', async () => {
    const res = await request(app)
      .put(`/api/properties/${propertyId}`)
      .set('Cookie', ownerCookie)
      .send({ price: 999 });
    expect(res.status).toBe(200);
    expect(res.body.property.price).toBe(999);
  });

  it('non-owner gets 403 on update', async () => {
    const res = await request(app)
      .put(`/api/properties/${propertyId}`)
      .set('Cookie', otherCookie)
      .send({ price: 1 });
    expect(res.status).toBe(403);
  });

  it('non-owner gets 403 on delete', async () => {
    const res = await request(app)
      .delete(`/api/properties/${propertyId}`)
      .set('Cookie', otherCookie);
    expect(res.status).toBe(403);
  });

  it('owner can delete their property', async () => {
    const res = await request(app)
      .delete(`/api/properties/${propertyId}`)
      .set('Cookie', ownerCookie);
    expect(res.status).toBe(200);
  });
});

describe('Properties — My Listings', () => {
  it('returns 401 without auth', async () => {
    const res = await request(app).get('/api/properties/mine');
    expect(res.status).toBe(401);
  });

  it('returns only the authenticated user listings', async () => {
    await request(app)
      .post('/api/properties')
      .set('Cookie', ownerCookie)
      .send(sampleProperty);

    const res = await request(app)
      .get('/api/properties/mine')
      .set('Cookie', ownerCookie);
    expect(res.status).toBe(200);
    expect(res.body.properties.every((p) => p.author.username === 'owner')).toBe(true);
  });
});
