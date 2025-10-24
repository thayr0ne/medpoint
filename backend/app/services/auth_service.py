from datetime import datetime, timedelta
from typing import Any

from fastapi import Depends, HTTPException, status
from fastapi.security import OAuth2PasswordBearer
from jose import JWTError, jwt
from passlib.context import CryptContext

from ..schemas.auth import UserRead

SECRET_KEY = "change-me"
ALGORITHM = "HS256"
ACCESS_TOKEN_EXPIRE_MINUTES = 60 * 8
pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")
oauth2_scheme = OAuth2PasswordBearer(tokenUrl="/api/auth/login")

# Mock user storage for scaffolding
USERS = {
    "medico@example.com": {
        "id": "1",
        "name": "Dra. Mariana Alves",
        "email": "medico@example.com",
        "hashed_password": pwd_context.hash("senha123"),
        "role": "medico",
        "crm": "123456",
        "specialty": "Clínica Médica",
    }
}


def verify_password(plain_password: str, hashed_password: str) -> bool:
    return pwd_context.verify(plain_password, hashed_password)


def authenticate_user(email: str, password: str) -> UserRead | None:
    user_data = USERS.get(email)
    if not user_data or not verify_password(password, user_data["hashed_password"]):
        return None
    clean_data = {k: v for k, v in user_data.items() if k != "hashed_password"}
    return UserRead(**clean_data)


def create_access_token(user: UserRead) -> str:
    to_encode: dict[str, Any] = {
        "sub": user.email,
        "exp": datetime.utcnow() + timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES),
        "role": user.role,
    }
    return jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)


async def get_current_user(token: str = Depends(oauth2_scheme)) -> UserRead:
    if token is None:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Token ausente")
    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        email: str = payload.get("sub")
        if email is None:
            raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Token inválido")
    except JWTError as exc:  # pragma: no cover - apenas scaffolding
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Token inválido") from exc

    user = authenticate_user(email, "senha123")
    if not user:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Usuário não encontrado")
    return user
