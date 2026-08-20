from fastapi import APIRouter, Depends

from app.auth.dependencies import get_current_user
from app.models.user import User
from app.schemas.user import UserPublic

router = APIRouter(prefix="/api/user", tags=["user"])


@router.get("/profile", response_model=UserPublic)
def profile(current_user: User = Depends(get_current_user)) -> User:
    return current_user
