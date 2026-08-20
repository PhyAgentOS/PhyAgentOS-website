# PhyAgentOS User System MVP

This directory contains an independent user registration and login MVP for PhyAgentOS-website. It does not modify or integrate with the existing website yet.

## Directory

```text
user-system/
  backend/
    app/
      api/                  FastAPI routers
      auth/                 JWT, password hashing, auth dependencies
      core/                 environment-based configuration
      database/             SQLAlchemy engine, session, Base
      models/               users and verification_codes tables
      schemas/              Pydantic request and response models
      services/             Mock SMS and verification-code logic
      main.py               FastAPI app entry
    tests/                  pytest API tests
    requirements.txt        backend dependencies
  .env.example              environment variable template
  .gitignore                ignores local test/runtime artifacts
  README.md                 this file
```

## Python Requirement

Python 3.11+ is recommended.

## Install Dependencies

```bash
cd user-system/backend
python -m venv .venv
.venv\Scripts\activate
pip install -r requirements.txt
```

## Environment Variables

Copy the example file and fill in local values:

```bash
copy ..\.env.example .env
```

Required variables:

```text
DATABASE_URL=sqlite:///./user_system.db
JWT_SECRET=
JWT_ALGORITHM=HS256
ACCESS_TOKEN_EXPIRE_MINUTES=60
APP_ENV=development
SMS_PROVIDER=mock
CORS_ORIGINS=http://127.0.0.1:5173,http://localhost:5173,http://127.0.0.1:8010,http://localhost:8010
VERIFICATION_CODE_EXPIRE_MINUTES=5
VERIFICATION_CODE_RESEND_SECONDS=60
```

Do not commit real database passwords, JWT secrets, API keys, or SMS provider credentials.

## Database Initialization

The MVP creates tables automatically when FastAPI starts:

- `users`
- `verification_codes`

User IDs are database autoincrement integers. The code never generates user IDs manually.

For production, add migrations before launch.

## Start Backend

```bash
cd user-system/backend
uvicorn app.main:app --reload --host 127.0.0.1 --port 8000
```

Health check:

```text
GET http://127.0.0.1:8000/health
```

Swagger:

```text
http://127.0.0.1:8000/docs
```

## Frontend Preview

The MVP frontend is integrated into the main PhyAgentOS-website React app:

```text
http://127.0.0.1:5173/#/login
http://127.0.0.1:5173/#/register
```

The main navigation contains a single `Login / Register` entry. Unregistered users can navigate from the login page to the register page.

## API Summary

### Send Verification Code

```text
POST /api/auth/send-code
```

```json
{
  "phone": "13800138000",
  "purpose": "register"
}
```

`purpose` supports `register` and `login`.

In development only, the response includes `debug_code` for local testing. Production must never return the verification code.

### Register

```text
POST /api/auth/register
```

```json
{
  "username": "Yanwei",
  "phone": "13800138000",
  "email": "yanwei@example.com",
  "password": "strongpass123",
  "confirm_password": "strongpass123",
  "code": "123456"
}
```

### Password Login

```text
POST /api/auth/login/password
```

```json
{
  "account": "13800138000",
  "password": "strongpass123"
}
```

`account` may be a phone number or email address.

### Code Login

```text
POST /api/auth/login/code
```

```json
{
  "phone": "13800138000",
  "code": "123456"
}
```

### Profile

```text
GET /api/user/profile
Authorization: Bearer <token>
```

## Mock Verification Code Testing

With `APP_ENV=development`, `/api/auth/send-code` returns:

```json
{
  "message": "code sent",
  "debug_code": "123456"
}
```

Use that `debug_code` in register or code-login requests.

The MVP enforces:

- six-digit numeric codes
- expiration time
- single use
- purpose separation between `register` and `login`
- resend throttling per phone and purpose

## Run Tests

```bash
cd user-system/backend
pytest
```

The test suite covers:

- sending verification codes
- successful registration
- duplicate phone, email, and username failures
- password login success
- wrong password failure
- code login success
- expired code failure
- used code reuse failure
- profile success with JWT
- profile failure without token

## PostgreSQL Switch

Set `DATABASE_URL` to a PostgreSQL connection string:

```text
DATABASE_URL=postgresql+psycopg://user:password@host:5432/dbname
```

Then add the PostgreSQL driver to `backend/requirements.txt`, for example `psycopg[binary]`, before production deployment.

No database credentials should be hardcoded in source code.

## Real SMS Provider Integration

The SMS boundary is:

```text
backend/app/services/sms.py
```

Replace or extend `MockSmsProvider` with a real provider implementation. Keep the public function:

```python
send_sms_code(phone, code)
```

Business logic in `backend/app/services/verification.py` should not need to change.

## Future PhyAgentOS-website Integration

This MVP intentionally does not modify the existing website.

Current local integration points:

- login/register routes are mounted in `src/App.tsx`
- the navigation entry is in `src/sections/shared/Navigation.tsx`
- the React auth pages are `src/pages/Login.tsx` and `src/pages/Register.tsx`
- API calls are wrapped by `src/lib/userSystemApi.ts`

Future production integration should move the API base URL into the website environment setup, decide the official JWT/session persistence strategy, and add guarded pages or user menu components where product requirements need them.
