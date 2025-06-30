import together
import os
from dotenv import load_dotenv

load_dotenv()  # Load variables from .env

together.api_key = os.getenv("TOGETHER_API_KEY")

def get_together_response(question: str, model="mistralai/Mixtral-8x7B-Instruct-v0.1"):
    prompt = f"""
You are a coding assistant.

Given a coding problem, provide a single solution:

Approach: ...
Data Structures: ...
Time: ...
Space: ...
Algorithm: short clear steps.

Problem:
{question}
"""

    try:
        response = together.Complete.create(
            prompt=prompt,
            model=model,
            max_tokens=400,
            temperature=0.5,
            stop=["---"]
        )
        return response['choices'][0]['text'].strip()
    except Exception as e:
        return f"Error: {e}"
