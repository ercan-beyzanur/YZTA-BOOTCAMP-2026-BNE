# src/routes/auth_routes.py
from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.ext.asyncio import AsyncSession
from src.database import get_db
from src.repositories.user_repository import UserRepository
from src.services.auth_service import AuthService
from src.schemas.auth_schemas import UserRegisterRequest, UserLoginRequest, TokenResponse, UserResponse

router = APIRouter(prefix="/auth", tags=["Authentication"])

# Dependency Injection yardımıyla servis katmanını hazırlayan yardımcı fonksiyon
def get_auth_service(db: AsyncSession = Depends(get_db)) -> AuthService:
    user_repo = UserRepository(db)
    return AuthService(user_repo)

@router.post("/register", response_model=UserResponse, status_code=status.HTTP_201_CREATED)
async def register(
    payload: UserRegisterRequest, 
    auth_service: AuthService = Depends(get_auth_service)
):
    try:
        new_user = await auth_service.register_user(
            username=payload.username,
            email=payload.email,
            password=payload.password
        )
        return new_user
    except ValueError as e:
        # E-posta zaten varsa servis katmanı ValueError fırlatır, API'de bunu 400 Bad Request'e çeviriyoruz.
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST, 
            detail=str(e)
        )

@router.post("/login", response_model=TokenResponse)
async def login(
    payload: UserLoginRequest, 
    auth_service: AuthService = Depends(get_auth_service)
):
    user = await auth_service.authenticate_user(
        email=payload.email,
        password=payload.password
    )
    if not user:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Hatalı e-posta veya şifre girdiniz!",
            headers={"WWW-Authenticate": "Bearer"},
        )
    
    # Giriş başarılıysa JWT token üretiyoruz
    token = auth_service.create_access_token(data={"sub": user.email})
    
    return TokenResponse(
        access_token=token,
        username=user.username,
        email=user.email
    )