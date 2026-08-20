import secrets
from datetime import datetime, timedelta, timezone

from fastapi import HTTPException, status
from sqlalchemy import desc, select
from sqlalchemy.orm import Session

from app.core.config import get_settings
from app.models.verification_code import VerificationCode
from app.services.sms import send_sms_code


def generate_six_digit_code() -> str:
    return f"{secrets.randbelow(1_000_000):06d}"


def create_and_send_code(db: Session, phone: str, purpose: str) -> tuple[VerificationCode, str | None]:
    settings = get_settings()
    now = datetime.now(timezone.utc)

    latest_code = db.execute(
        select(VerificationCode)
        .where(VerificationCode.phone == phone, VerificationCode.purpose == purpose)
        .order_by(desc(VerificationCode.created_at))
        .limit(1)
    ).scalar_one_or_none()

    if latest_code:
        latest_created_at = _ensure_aware(latest_code.created_at)
        resend_at = latest_created_at + timedelta(seconds=settings.verification_code_resend_seconds)
        if resend_at > now:
            raise HTTPException(
                status_code=status.HTTP_429_TOO_MANY_REQUESTS,
                detail="Verification code was sent recently. Please try again later.",
            )

    code = generate_six_digit_code()
    verification_code = VerificationCode(
        phone=phone,
        code=code,
        purpose=purpose,
        expire_time=now + timedelta(minutes=settings.verification_code_expire_minutes),
        used=False,
    )
    db.add(verification_code)
    db.commit()
    db.refresh(verification_code)
    send_sms_code(phone, code)

    # Development only: never return SMS verification codes in production.
    debug_code = code if settings.is_development else None
    return verification_code, debug_code


def verify_code_or_raise(db: Session, phone: str, code: str, purpose: str) -> VerificationCode:
    now = datetime.now(timezone.utc)
    verification_code = db.execute(
        select(VerificationCode)
        .where(
            VerificationCode.phone == phone,
            VerificationCode.code == code,
            VerificationCode.purpose == purpose,
        )
        .order_by(desc(VerificationCode.created_at))
        .limit(1)
    ).scalar_one_or_none()

    if verification_code is None:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="Invalid verification code")
    if verification_code.used:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="Verification code already used")
    if _ensure_aware(verification_code.expire_time) <= now:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="Verification code expired")

    verification_code.used = True
    db.add(verification_code)
    db.commit()
    db.refresh(verification_code)
    return verification_code


def _ensure_aware(value: datetime) -> datetime:
    if value.tzinfo is None:
        return value.replace(tzinfo=timezone.utc)
    return value
