from fastapi import APIRouter
from app.models.chat import ChatRequest, ChatResponse
# from app.services.ollama_service import get_ollama_response
from app.services.together_service import get_together_response

chat_router = APIRouter()

@chat_router.post("/chat", response_model=ChatResponse)
def get_code_solution(data: ChatRequest):
    # ollama_result = get_ollama_response(data.question)
    together_result = get_together_response(data.question)
    return ChatResponse(
        # ollama=ollama_result,
        together=together_result
    )