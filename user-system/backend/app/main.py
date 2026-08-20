from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.api import auth, health, user
from app.core.config import get_settings
from app.database.database import Base, engine
from app.models import User, VerificationCode


def create_app() -> FastAPI:
    settings = get_settings()
    app = FastAPI(title="PhyAgentOS User System MVP", version="0.1.0")

    app.add_middleware(
        CORSMiddleware,
        allow_origins=settings.allowed_origins,
        allow_credentials=True,
        allow_methods=["*"],
        allow_headers=["*"],
    )

    Base.metadata.create_all(bind=engine)
    app.include_router(health.router)
    app.include_router(auth.router)
    app.include_router(user.router)
    return app


app = create_app()

__all__ = ["app", "create_app", "User", "VerificationCode"]
