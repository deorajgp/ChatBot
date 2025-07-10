from pydantic import BaseModel

class ChatRequest(BaseModel):
    user_question: str

class ChatResponse(BaseModel):
    llm_response: str
    