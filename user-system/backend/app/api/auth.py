from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy import or_, select
from sqlalchemy.orm import Session

from app.auth.jwt import create_access_token
from app.auth.password import hash_password, verify_password
from app.database.database import get_db
from app.models.user import User
from app.schemas.auth import (
    CodeLoginRequest,
    PasswordLoginRequest,
    RegisterRequest,
    SendCodeRequest,
    SendCodeResponse,
    TokenResponse,
)
from app.schemas.user import UserPublic
from app.services.verification import create_and_send_code, verify_code_or_raise

router = APIRouter(prefix="/api/auth", tags=["auth"])


@router.post("/send-code", response_model=SendCodeResponse)
def send_code(payload: SendCodeRequest, db: Session = Depends(get_db)) -> SendCodeResponse:
    _, debug_code = create_and_send_code(db, payload.phone, payload.purpose)
    return SendCodeResponse(message="code sent", debug_code=debug_code)


@router.post("/register", response_model=UserPublic, status_code=status.HTTP_201_CREATED)
def register(payload: RegisterRequest, db: Session = Depends(get_db)) -> User:
    if payload.password != payload.confirm_password:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="Passwords do not match")

    email = str(payload.email).lower() if payload.email else None
    _ensure_unique_user_fields(db, payload.username, payload.phone, email)
    verify_code_or_raise(db, payload.phone, payload.code, "register")

    user = User(
        username=payload.username,
        phone=payload.phone,
        email=email,
        password_hash=hash_password(payload.password),
        phone_verified=True,
        status="active",
    )
    db.add(user)
    db.commit()
    db.refresh(user)
    return user


@router.post("/login/password", response_model=TokenResponse)
def login_with_password(payload: PasswordLoginRequest, db: Session = Depends(get_db)) -> TokenResponse:
    raw_account = payload.account.strip()
    account = raw_account.lower()
    user = db.execute(
        select(User).where(or_(User.phone == raw_account, User.email == account))
    ).scalar_one_or_none()

    if user is None:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="User not found")
    if user.status != "active":
        raise HTTPException(status_code=status.HTTP_403_FORBIDDEN, detail="User account disabled")
    if not verify_password(payload.password, user.password_hash):
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Incorrect password")

    return _token_response(user)


@router.post("/login/code", response_model=TokenResponse)
def login_with_code(payload: CodeLoginRequest, db: Session = Depends(get_db)) -> TokenResponse:
    user = db.execute(select(User).where(User.phone == payload.phone)).scalar_one_or_none()
    if user is None:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="User not found")
    if user.status != "active":
        raise HTTPException(status_code=status.HTTP_403_FORBIDDEN, detail="User account disabled")

    verify_code_or_raise(db, payload.phone, payload.code, "login")
    return _token_response(user)


def _ensure_unique_user_fields(db: Session, username: str, phone: str, email: str | None) -> None:
    checks = [User.username == username, User.phone == phone]
    if email is not None:
        checks.append(User.email == email)

    existing = db.execute(select(User).where(or_(*checks))).scalars()

    for user in existing:
        if user.username == username:
            raise HTTPException(status_code=status.HTTP_409_CONFLICT, detail="Username already registered")
        if user.phone == phone:
            raise HTTPException(status_code=status.HTTP_409_CONFLICT, detail="Phone already registered")
        if email is not None and user.email == email:
            raise HTTPException(status_code=status.HTTP_409_CONFLICT, detail="Email already registered")


def _token_response(user: User) -> TokenResponse:
    return TokenResponse(access_token=create_access_token(str(user.id)), user=UserPublic.model_validate(user))
