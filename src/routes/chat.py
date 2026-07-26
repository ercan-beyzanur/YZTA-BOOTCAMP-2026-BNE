# src/routes/chat.py
from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.ext.asyncio import AsyncSession
from src.database import get_db
from src.schemas.chat import ChatRequest, ChatResponse
from src.services.rag_service import RAGService
from src.agents.support_agent import support_agent  # 👈 Tekil agent instance'ı

router = APIRouter(prefix="/chat", tags=["Chat & Agent"])

@router.post("/", response_model=ChatResponse)
async def chat_endpoint(request: ChatRequest, db: AsyncSession = Depends(get_db)):
    try:
        # Her istek kendi taze RAGService instance'ına sahip olur (No Race Condition!)
        rag_service = RAGService(db)
        
        result = await support_agent.run(
            question=request.question,
            thread_id=request.thread_id,
            rag_service=rag_service
        )

        return ChatResponse(
            thread_id=request.thread_id,
            question=request.question,
            response=result["response"],
            context=result["context"]
        )
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Ajan çalışırken hata oluştu: {str(e)}")