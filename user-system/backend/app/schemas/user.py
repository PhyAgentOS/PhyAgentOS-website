from datetime import datetime

from pydantic import BaseModel, ConfigDict, EmailStr


class UserPublic(BaseModel):
    id: int
    username: str
    phone: str
    email: EmailStr | None = None
    created_at: datetime

    model_config = ConfigDict(from_attributes=True)
