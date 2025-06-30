from fastapi import FastAPI
from app.api.v1.chat import chat_router

app = FastAPI(title="Code Helper Chatbot")
app.include_router(chat_router, prefix="/api/v1", tags=["Chat"])
