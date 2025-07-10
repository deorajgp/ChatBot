from fastapi import APIRouter
from app.models.chat_model import ChatRequest, ChatResponse
from app.services.together_service import get_together_response

chat_router = APIRouter()

@chat_router.post("/chat", response_model=ChatResponse)
def get_code_solution(data: ChatRequest):
    result = get_together_response(data.user_question,data.llm_model)
    return {"llm_response": result}
