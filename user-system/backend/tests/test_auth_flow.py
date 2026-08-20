from datetime import datetime, timedelta, timezone

from app.database.database import get_db
from app.models.verification_code import VerificationCode


def send_code(client, phone="13800138000", purpose="register"):
    response = client.post("/api/auth/send-code", json={"phone": phone, "purpose": purpose})
    assert response.status_code == 200
    data = response.json()
    assert data["message"] == "code sent"
    assert data["debug_code"]
    return data["debug_code"]


def register_user(client, username="Yanwei", phone="13800138000", email="yanwei@example.com"):
    code = send_code(client, phone=phone, purpose="register")
    response = client.post(
        "/api/auth/register",
        json={
            "username": username,
            "phone": phone,
            "email": email,
            "password": "strongpass123",
            "confirm_password": "strongpass123",
            "code": code,
        },
    )
    assert response.status_code == 201
    data = response.json()
    assert isinstance(data["id"], int)
    assert data["username"] == username
    return data


def test_send_code_success(client):
    send_code(client)


def test_register_user_success(client):
    user = register_user(client)
    assert user["phone"] == "13800138000"
    assert user["email"] == "yanwei@example.com"


def test_duplicate_phone_register_fails(client):
    register_user(client)
    code = send_code(client, phone="13800138000", purpose="register")
    response = client.post(
        "/api/auth/register",
        json={
            "username": "Other",
            "phone": "13800138000",
            "email": "other@example.com",
            "password": "strongpass123",
            "confirm_password": "strongpass123",
            "code": code,
        },
    )
    assert response.status_code == 409
    assert response.json()["detail"] == "Phone already registered"


def test_duplicate_email_register_fails(client):
    register_user(client)
    code = send_code(client, phone="13800138001", purpose="register")
    response = client.post(
        "/api/auth/register",
        json={
            "username": "Other",
            "phone": "13800138001",
            "email": "yanwei@example.com",
            "password": "strongpass123",
            "confirm_password": "strongpass123",
            "code": code,
        },
    )
    assert response.status_code == 409
    assert response.json()["detail"] == "Email already registered"


def test_duplicate_username_register_fails(client):
    register_user(client)
    code = send_code(client, phone="13800138002", purpose="register")
    response = client.post(
        "/api/auth/register",
        json={
            "username": "Yanwei",
            "phone": "13800138002",
            "email": "other2@example.com",
            "password": "strongpass123",
            "confirm_password": "strongpass123",
            "code": code,
        },
    )
    assert response.status_code == 409
    assert response.json()["detail"] == "Username already registered"


def test_password_login_success(client):
    register_user(client)
    response = client.post("/api/auth/login/password", json={"account": "yanwei@example.com", "password": "strongpass123"})
    assert response.status_code == 200
    assert response.json()["access_token"]


def test_wrong_password_fails(client):
    register_user(client)
    response = client.post("/api/auth/login/password", json={"account": "13800138000", "password": "wrong"})
    assert response.status_code == 401
    assert response.json()["detail"] == "Incorrect password"


def test_code_login_success(client):
    register_user(client)
    code = send_code(client, phone="13800138000", purpose="login")
    response = client.post("/api/auth/login/code", json={"phone": "13800138000", "code": code})
    assert response.status_code == 200
    assert response.json()["token_type"] == "bearer"


def test_expired_code_fails(client):
    code = send_code(client)
    db = next(client.app.dependency_overrides[get_db]())
    verification_code = db.query(VerificationCode).filter_by(code=code).first()
    verification_code.expire_time = datetime.now(timezone.utc) - timedelta(minutes=1)
    db.commit()
    db.close()

    response = client.post(
        "/api/auth/register",
        json={
            "username": "Yanwei",
            "phone": "13800138000",
            "email": "yanwei@example.com",
            "password": "strongpass123",
            "confirm_password": "strongpass123",
            "code": code,
        },
    )
    assert response.status_code == 400
    assert response.json()["detail"] == "Verification code expired"


def test_used_code_cannot_be_reused(client):
    register_user(client)
    code = send_code(client, phone="13800138000", purpose="login")
    first = client.post("/api/auth/login/code", json={"phone": "13800138000", "code": code})
    second = client.post("/api/auth/login/code", json={"phone": "13800138000", "code": code})
    assert first.status_code == 200
    assert second.status_code == 400
    assert second.json()["detail"] == "Verification code already used"


def test_profile_with_jwt_success(client):
    register_user(client)
    login = client.post("/api/auth/login/password", json={"account": "13800138000", "password": "strongpass123"})
    token = login.json()["access_token"]
    response = client.get("/api/user/profile", headers={"Authorization": f"Bearer {token}"})
    assert response.status_code == 200
    assert response.json()["username"] == "Yanwei"


def test_profile_without_token_fails(client):
    response = client.get("/api/user/profile")
    assert response.status_code == 401
    assert response.json()["detail"] == "Not authenticated"
