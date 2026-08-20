from app.core.config import get_settings


class MockSmsProvider:
    def send_sms_code(self, phone: str, code: str) -> bool:
        # Mock only: production must replace this provider with a real SMS service.
        print(f"[MockSMS] phone={phone}, code={code}")
        return True


def send_sms_code(phone: str, code: str) -> bool:
    settings = get_settings()
    if settings.sms_provider != "mock":
        raise NotImplementedError("Only mock SMS provider is implemented in this MVP")
    return MockSmsProvider().send_sms_code(phone, code)
