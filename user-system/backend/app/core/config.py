from functools import lru_cache
from typing import Literal

from pydantic import Field
from pydantic_settings import BaseSettings, SettingsConfigDict


class Settings(BaseSettings):
    database_url: str = Field(default="sqlite:///./user_system.db", alias="DATABASE_URL")
    jwt_secret: str = Field(default="", alias="JWT_SECRET")
    jwt_algorithm: str = Field(default="HS256", alias="JWT_ALGORITHM")
    access_token_expire_minutes: int = Field(default=60, alias="ACCESS_TOKEN_EXPIRE_MINUTES")
    app_env: Literal["development", "test", "production"] = Field(default="development", alias="APP_ENV")
    sms_provider: Literal["mock"] = Field(default="mock", alias="SMS_PROVIDER")
    cors_origins: str = Field(default="http://127.0.0.1:5173,http://localhost:5173", alias="CORS_ORIGINS")
    verification_code_expire_minutes: int = Field(default=5, alias="VERIFICATION_CODE_EXPIRE_MINUTES")
    verification_code_resend_seconds: int = Field(default=60, alias="VERIFICATION_CODE_RESEND_SECONDS")

    model_config = SettingsConfigDict(env_file=".env", env_file_encoding="utf-8", extra="ignore")

    @property
    def allowed_origins(self) -> list[str]:
        return [origin.strip() for origin in self.cors_origins.split(",") if origin.strip()]

    @property
    def is_development(self) -> bool:
        return self.app_env == "development"

    @property
    def effective_jwt_secret(self) -> str:
        if not self.jwt_secret:
            if self.app_env == "production":
                raise ValueError("JWT_SECRET must be set in production")
            return "development-only-change-me"
        return self.jwt_secret


@lru_cache
def get_settings() -> Settings:
    return Settings()
