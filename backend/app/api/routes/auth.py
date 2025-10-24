from fastapi import APIRouter, Depends, HTTPException, status
from ...schemas.auth import SignInPayload, TokenResponse, UserRead
from ...services import auth_service

router = APIRouter()


@router.post("/login", response_model=TokenResponse)
async def login(payload: SignInPayload) -> TokenResponse:
    user = auth_service.authenticate_user(payload.email, payload.password)
    if not user:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Credenciais inválidas")
    token = auth_service.create_access_token(user)
    return TokenResponse(access_token=token, token_type="bearer", user=user)


@router.get("/me", response_model=UserRead)
async def get_profile(current_user: UserRead = Depends(auth_service.get_current_user)) -> UserRead:
    return current_user


@router.post("/logout", status_code=status.HTTP_204_NO_CONTENT)
async def logout() -> None:
    return None
