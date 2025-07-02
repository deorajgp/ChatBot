import together
from app.core.config import get_together_api_key

together.api_key = get_together_api_key()

def get_together_response(question: str):
    prompt = f"""
You are a coding assistant.

Given a coding problem, your task is to provide two concise solutions — **Optimal and Brute Force** — formatted exactly like the example below. Avoid unnecessary reasoning or thinking aloud.

Output Example:

Approach: Hashing, Two-pointer  
Data Structures: HashMap, Array  
Time: O(n)  
Space: O(n)  
Algorithm: Use a HashMap to track values and solve in one pass.

Approach: Brute force  
Data Structures: Array  
Time: O(n^2)  
Space: O(1)  
Algorithm: Generate every possible combination and check the sum.

Now follow the same format for this coding problem:

{question}
"""

    try:
        response = together.Complete.create(
            prompt=prompt,
            model="mistralai/Mixtral-8x7B-Instruct-v0.1",
            max_tokens=500,
            temperature=0.3,
            stop=["---"]
        )
        full_text = response['choices'][0]['text']
        # Trim everything before the first "Approach:"
        if "Approach:" in full_text:
            trimmed = full_text.split("Approach:", 1)[1]
            return "Approach:" + trimmed.strip()
        return full_text.strip()
    except Exception as e:
        return f"Error from Together API: {e}"
