# src/routes/chat.py
from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.ext.asyncio import AsyncSession
from src.database import get_db
from src.schemas.chat_schemas import ChatRequest, ChatResponse
from src.services.rag_service import RAGService
from src.agents.support_agent import support_agent
from src.services.auth_service import get_current_user  
from src.models.user import User  

router = APIRouter(prefix="/chat", tags=["Chat & Agent"])

@router.post("/", response_model=ChatResponse)
async def chat_endpoint(
    request: ChatRequest, 
    db: AsyncSession = Depends(get_db),
    current_user: User = Depends(get_current_user)  
):
    try:
        rag_service = RAGService(db)
        
        internal_thread_id = f"user_session_{current_user.id}"
        
        result = await support_agent.run(
            question=request.question,
            thread_id=internal_thread_id,
            rag_service=rag_service
        )

        return ChatResponse(
            thread_id=internal_thread_id,
            question=request.question,
            response=result["response"],
            context=result["context"]
        )
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Ajan çalışırken hata oluştu: {str(e)}")