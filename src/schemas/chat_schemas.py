# src/schemas/chat.py
from pydantic import BaseModel, Field

class ChatRequest(BaseModel):
    question: str = Field(..., description="Kullanıcının sorduğu soru", example="Aura Tek nedir?")

class ChatResponse(BaseModel):
    thread_id: str
    question: str
    response: str
    context: str = Field(default="", description="RAG veritabanından çekilen alakalı metinler")