from typing import Literal

from pydantic import BaseModel, EmailStr, Field, field_validator

from app.schemas.user import UserPublic

PHONE_PATTERN = r"^\+?\d{7,15}$"


class SendCodeRequest(BaseModel):
    phone: str = Field(pattern=PHONE_PATTERN)
    purpose: Literal["register", "login"]


class SendCodeResponse(BaseModel):
    message: str
    debug_code: str | None = None


class RegisterRequest(BaseModel):
    username: str = Field(min_length=2, max_length=64)
    phone: str = Field(pattern=PHONE_PATTERN)
    email: EmailStr
    password: str = Field(min_length=8, max_length=128)
    confirm_password: str = Field(min_length=8, max_length=128)
    code: str = Field(pattern=r"^\d{6}$")

    @field_validator("username")
    @classmethod
    def username_cannot_be_blank(cls, value: str) -> str:
        if not value.strip():
            raise ValueError("Username cannot be empty")
        return value.strip()


class PasswordLoginRequest(BaseModel):
    account: str = Field(min_length=3, max_length=255)
    password: str = Field(min_length=1, max_length=128)


class CodeLoginRequest(BaseModel):
    phone: str = Field(pattern=PHONE_PATTERN)
    code: str = Field(pattern=r"^\d{6}$")


class TokenResponse(BaseModel):
    access_token: str
    token_type: str = "bearer"
    user: UserPublic
