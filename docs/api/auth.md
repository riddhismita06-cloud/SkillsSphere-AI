# Auth API

## Register User and Return JWT

Endpoint:

- `POST /api/auth/register`

Behavior:

- Validates `name`, `email`, `password`, `role` using zod.
- Rejects duplicate email registrations.
- Hashes password using bcrypt before save.
- Creates user and returns signed JWT token.
- Token payload includes `userId` and `role`.

### Request Body

```json
{
  "name": "Jane Doe",
  "email": "jane@example.com",
  "password": "securePass123",
  "role": "student"
}
```

### Success Response (201)

```json
{
  "success": true,
  "message": "User registered successfully",
  "token": "<jwt_token>",
  "user": {
    "id": "68004f7f82d5d3f90dc12345",
    "name": "Jane Doe",
    "email": "jane@example.com",
    "role": "student",
    "createdAt": "2026-04-17T10:00:00.000Z"
  }
}
```

### Validation Error (400)

```json
{
  "success": false,
  "message": "Invalid registration payload",
  "errors": [
    { "field": "email", "message": "Please provide a valid email address" }
  ]
}
```

### Duplicate Email (409)

```json
{
  "success": false,
  "message": "A user with this email already exists"
}
```

### cURL Example

```bash
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Jane Doe",
    "email": "jane@example.com",
    "password": "securePass123",
    "role": "student"
  }'
```
