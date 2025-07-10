import together
import os
from dotenv import load_dotenv

load_dotenv()
together.api_key = os.getenv("TOGETHER_API_KEY")

def get_together_response(user_question: str):
    """
    This function sends a coding problem to Together API
    and returns the response in a clean format.
    """

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

{user_question}
"""

    try:
        response = together.Complete.create(
            prompt=prompt,
            model="mistralai/Mixtral-8x7B-Instruct-v0.1",
            max_tokens=500,
            temperature=0.3
        )

        result = response['choices'][0]['text']
        result = "Approach:" + result.split("Approach:", 1)[1].strip()
        return result

    except Exception as error:
        return f"Error: {error}"
