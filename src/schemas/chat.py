# src/schemas/chat.py
from pydantic import BaseModel, Field

class ChatRequest(BaseModel):
    question: str = Field(..., description="Kullanıcının sorduğu soru", example="Aura Tek nedir?")
    thread_id: str = Field(default="default_session", description="Kullanıcının veya sohbet oturumunun benzersiz ID'si", example="user_123_session_1")

class ChatResponse(BaseModel):
    thread_id: str
    question: str
    response: str
    context: str = Field(default="", description="RAG veritabanından çekilen alakalı metinler")