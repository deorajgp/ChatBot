from pydantic import BaseModel

class ChatRequest(BaseModel):
    user_question: str
    llm_model: str

class ChatResponse(BaseModel):
    llm_response: str
