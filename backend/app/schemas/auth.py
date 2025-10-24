from pydantic import BaseModel, EmailStr


class SignInPayload(BaseModel):
    email: EmailStr
    password: str


class UserRead(BaseModel):
    id: str
    name: str
    email: EmailStr
    role: str
    crm: str | None = None
    specialty: str | None = None


class TokenResponse(BaseModel):
    access_token: str
    token_type: str
    user: UserRead
