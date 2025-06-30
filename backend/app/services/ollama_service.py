import requests

def get_ollama_response(question: str, model="codellama:7b-instruct"):
    prompt = f"""
You are a coding assistant.

Your task is to solve the following problem and respond in this format:

Approach: ...
Data Structures: ...
Time: ...
Space: ...
Algorithm: short clear steps.

Problem:
{question}
"""

    try:
        response = requests.post(
            "http://localhost:11434/api/chat",
            json={
                "model": model,
                "messages": [{"role": "user", "content": prompt}],
                "stream": False
            }
        )
        return response.json()["message"]["content"]
    except Exception as e:
        return f"Error: {e}"
