# PropSpace — Property Listing App

A full-stack web application for listing, searching, and managing properties for rent or sale.

**Stack:** React + Vite + Tailwind CSS · Node.js + Express · MongoDB + Mongoose · JWT (HttpOnly cookie)

---

## Repo Layout

```
prop-space/
├── client/          # React frontend (Vite + Tailwind)
├── server/          # Express backend (REST API)
├── docker-compose.yml
└── README.md
```

---

## Quick Start (Local)

### Prerequisites
- Node.js ≥ 18
- MongoDB running locally on port 27017 (or use Docker below)

### 1. Backend

```bash
cd server
cp .env.example .env        # edit JWT_SECRET at minimum
npm install
npm run dev                 # http://localhost:5000
```

### 2. Frontend

```bash
cd client
cp .env.example .env
npm install
npm run dev                 # http://localhost:5173
```

---

## Quick Start (Docker)

```bash
docker-compose up --build
```
- Frontend: http://localhost:5173
- API:      http://localhost:5000

---

## Environment Variables

### server/.env
| Variable | Description | Default |
|---|---|---|
| `PORT` | API port | `5000` |
| `MONGO_URI` | MongoDB connection string | `mongodb://localhost:27017/propspace` |
| `JWT_SECRET` | Secret for signing JWTs | **required** |
| `JWT_EXPIRES_IN` | Token TTL | `7d` |
| `CLIENT_ORIGIN` | CORS origin for cookie | `http://localhost:5173` |

### client/.env
| Variable | Description | Default |
|---|---|---|
| `VITE_API_URL` | Backend base URL | `http://localhost:5000/api` |

---

## Running Tests

```bash
cd server
npm test
```

Tests require MongoDB on `mongodb://localhost:27017/propspace_test`. They cover:
- Registration (duplicate email/username, weak password)
- Login (wrong credentials → 401)
- Protected routes (no token → 401, valid cookie → 200)
- Change password (wrong old password → 401)
- Property CRUD (create, read, filter by city/price)
- Ownership enforcement (non-author update/delete → 403)
- My Listings (returns only auth user's properties)

---

## API Reference

All routes are prefixed `/api`.

### Auth

| Method | Endpoint | Auth | Description |
|---|---|---|---|
| POST | `/auth/register` | No | Register new user |
| POST | `/auth/login` | No | Login, sets cookie |
| POST | `/auth/logout` | Yes | Clear cookie |
| GET | `/auth/me` | Yes | Current user info |
| PUT | `/auth/change-password` | Yes | Change password |

### Users

| Method | Endpoint | Auth | Description |
|---|---|---|---|
| GET | `/users/profile` | Yes | Get profile |
| PUT | `/users/profile` | Yes | Update profile |

### Properties

| Method | Endpoint | Auth | Description |
|---|---|---|---|
| GET | `/properties` | No | Public feed (supports `?city=&minPrice=&maxPrice=&page=&limit=`) |
| GET | `/properties/mine` | Yes | My listings |
| GET | `/properties/:id` | No | Single property |
| POST | `/properties` | Yes | Create listing |
| PUT | `/properties/:id` | Yes (owner) | Update listing |
| DELETE | `/properties/:id` | Yes (owner) | Delete listing |

---

## Sample curl Commands

### Register
```bash
curl -c cookies.txt -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"username":"alice","email":"alice@example.com","password":"secret123"}'
```
**Expected:** `201 Created` · `{"user": {...}}`

### Login
```bash
curl -c cookies.txt -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"alice@example.com","password":"secret123"}'
```
**Expected:** `200 OK` · cookie `token` set

### Get current user (protected)
```bash
curl -b cookies.txt http://localhost:5000/api/auth/me
```
**Expected:** `200 OK` · `{"user": {...}}`

### Hit protected route with no token
```bash
curl http://localhost:5000/api/auth/me
```
**Expected:** `401 Unauthorized` · `{"message":"No token — authorization denied"}`

### Create a listing
```bash
curl -b cookies.txt -X POST http://localhost:5000/api/properties \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Cozy Studio in CBD",
    "description": "Fully furnished studio minutes from the city center.",
    "price": 450,
    "city": "Nairobi",
    "country": "Kenya",
    "propertyType": "Studio",
    "imageUrls": ["https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=400"]
  }'
```
**Expected:** `201 Created` · `{"property": {...}}`

### Public feed with filters
```bash
curl "http://localhost:5000/api/properties?city=Nairobi&minPrice=100&maxPrice=1000"
```
**Expected:** `200 OK` · `{"properties": [...], "total": N, "page": 1, "limit": 20}`

### My listings (auth required)
```bash
curl -b cookies.txt http://localhost:5000/api/properties/mine
```
**Expected:** `200 OK` · `{"properties": [...]}`

### Non-author tries to delete (403)
```bash
# Login as another user first to get a different cookie
curl -c other.txt -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"other@example.com","password":"secret123"}'

curl -b other.txt -X DELETE http://localhost:5000/api/properties/<PROPERTY_ID>
```
**Expected:** `403 Forbidden` · `{"message":"Forbidden — you do not own this listing"}`

### Change password
```bash
curl -b cookies.txt -X PUT http://localhost:5000/api/auth/change-password \
  -H "Content-Type: application/json" \
  -d '{"oldPassword":"secret123","newPassword":"newsecret456"}'
```
**Expected:** `200 OK`

---

## Architecture Notes

### Backend (Routes → Controllers → Services → Repositories)
- **Routes**: parse params, apply middleware, delegate to controllers
- **Controllers**: call services, send HTTP responses
- **Services**: business logic and validation
- **Repositories**: all Mongoose queries

### Frontend
- **JWT stored in HttpOnly cookie** — not accessible to JavaScript, protects against XSS
- **Global axios interceptor** — forces logout on 401 responses
- **ProtectedRoute guard** — redirects unauthenticated users to `/login`
- **useEffect cleanup** — all async fetches use a `cancelled` flag to prevent state updates after unmount

### Security
- Passwords hashed with bcrypt (12 rounds)
- JWT with 7-day expiry stored in HttpOnly, SameSite=lax cookie
- Server-side ownership check before any write operation
- Input validated with Joi (backend) and React Hook Form (frontend)
