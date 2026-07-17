# src/schemas/auth_schemas.py
from pydantic import BaseModel, EmailStr, Field

class UserRegisterRequest(BaseModel):
    username: str = Field(..., min_length=3, max_length=50, description="Kullanıcı ekran adı")
    email: EmailStr = Field(..., description="Geçerli bir e-posta adresi")
    password: str = Field(..., min_length=6, description="En az 6 karakterli şifre")

class UserLoginRequest(BaseModel):
    email: EmailStr = Field(..., description="Kayıtlı e-posta adresi")
    password: str = Field(..., description="Kullanıcı şifresi")

class TokenResponse(BaseModel):
    access_token: str
    token_type: str = "bearer"
    username: str
    email: str

class UserResponse(BaseModel):
    id: int
    username: str
    email: str

    class Config:
        from_attributes = True