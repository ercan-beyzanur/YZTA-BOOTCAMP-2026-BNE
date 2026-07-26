# src/services/auth_service.py
from datetime import datetime, timedelta
from jose import jwt
from pwdlib import PasswordHash
from pwdlib.hashers.bcrypt import BcryptHasher
from src.config import settings
from src.models.user import User
from src.repositories.user_repository import UserRepository
from fastapi import Depends, HTTPException, status
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials
from jose import jwt, JWTError
from sqlalchemy.ext.asyncio import AsyncSession
from src.database import get_db

# 1. Şifre güvenliği ve hashleme için pwdlib konfigürasyonu (bcrypt kullanır)
password_hash = PasswordHash((BcryptHasher(),))

class AuthService:
    def __init__(self, user_repo: UserRepository):
        """
        Dependency Injection: Servis katmanı veritabanına doğrudan gitmez,
        UserRepository'yi kullanır.
        """
        self.user_repo = user_repo

    @staticmethod
    def hash_password(password: str) -> str:
        return password_hash.hash(password)

    @staticmethod
    def verify_password(plain_password: str, hashed_password: str) -> bool:
        return password_hash.verify(plain_password, hashed_password)

    def create_access_token(self, data: dict) -> str:
        to_encode = data.copy()
        expire = datetime.utcnow() + timedelta(minutes=settings.ACCESS_TOKEN_EXPIRE_MINUTES)
        to_encode.update({"exp": expire})
        
        # config.py içindeki gizli anahtarımızla şifreliyoruz
        encoded_jwt = jwt.encode(to_encode, settings.SECRET_KEY, algorithm=settings.ALGORITHM)
        return encoded_jwt

    async def register_user(self, username: str, email: str, password: str) -> User:
        # E-posta daha önce alınmış mı kontrol et
        existing_user = await self.user_repo.get_by_email(email)
        if existing_user:
            raise ValueError("Bu e-posta adresi zaten sisteme kayıtlı!")

        # Şifreyi güvenli hale getir
        hashed_password = self.hash_password(password)
        
        # Yeni kullanıcı nesnesini oluştur ve repoya pasla
        new_user = User(
            username=username,
            email=email,
            hashed_password=hashed_password
        )
        return await self.user_repo.create(new_user)

    async def authenticate_user(self, email: str, password: str) -> User | None:
        user = await self.user_repo.get_by_email(email)
        if not user:
            return None # Kullanıcı bulunamadı
            
        if not self.verify_password(password, user.hashed_password):
            return None # Şifre yanlış
            
        return user

security = HTTPBearer()

async def get_current_user(
    credentials: HTTPAuthorizationCredentials = Depends(security), 
    db: AsyncSession = Depends(get_db)
) -> User:
    credentials_exception = HTTPException(
        status_code=status.HTTP_401_UNAUTHORIZED,
        detail="Geçersiz veya süresi dolmuş token!",
        headers={"WWW-Authenticate": "Bearer"},
    )
    
    token = credentials.credentials
    
    try:
        payload = jwt.decode(token, settings.SECRET_KEY, algorithms=[settings.ALGORITHM])
        email: str = payload.get("sub")
        if email is None:
            raise credentials_exception
    except JWTError:
        raise credentials_exception

    user_repo = UserRepository(db)
    user = await user_repo.get_by_email(email)
    if user is None:
        raise credentials_exception
    return user