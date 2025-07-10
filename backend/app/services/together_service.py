import together
import os
from dotenv import load_dotenv

load_dotenv()
together.api_key = os.getenv("TOGETHER_API_KEY")

def get_together_response(user_question: str, llm_model: str):
    """
     function to send a coding problem to Together API
    and get the response in a proper format.
    """

    prompt = f"""
You are a strict coding assistant.

Your task:
- Solve ONLY coding related problems.
- If the given input is **not a coding related problem**, immediately reply with exactly this text: "Approach: Not a coding problem".
- If it is a coding related problem, output exactly **two solutions** — one **Optimal** and one **Brute Force** — in the EXACT format shown below.  
- Do NOT provide extra explanation, thinking steps, or any text before or after your answer.

Here is the required output format (strictly follow it):

Approach: [Optimal Solution Approach]  
Data Structures: [Data Structures Used]  
Time: [Time Complexity]  
Space: [Space Complexity]  
Algorithm: [Only Short description of the algorithm]

Approach: Brute force  
Data Structures: [Data Structures Used]  
Time: [Time Complexity]  
Space: [Space Complexity]  
Algorithm: [Only Short description of the brute force algorithm]

Now follow this instruction strictly:
- If it is a coding problem, provide ONLY the two solutions in the exact format above.
- If it is NOT a coding related problem, respond with ONLY: "Approach: Not a coding problem".

Given Problem:
{user_question}
"""

    try:
        response = together.Complete.create(
            prompt=prompt,
            model=llm_model,
            max_tokens=200,
            temperature=0.3,
            
        )

        result = response['choices'][0]['text']
        if "Approach:" in result:
            trimmed_result = result.split("Approach:", 1)[1].strip()
            return "Approach:" + trimmed_result
        else:
            return result.strip()

    except Exception as error:
        return f"Error: {error}"
    
def get_pseudocode_response(question: str, model: str):
    prompt = f"""
You are a highly disciplined programming assistant.

Your task:
1. If the given problem is NOT a coding related problem, immediately return exactly: "Not a coding problem".
2. If it IS a coding related problem, provide ONLY the **pseudocode** in a clear, step-by-step format, without any explanation, comments, or additional text.

Important:
- Output ONLY the pseudocode if it is a coding related problem.
- Do NOT provide any extra messages, reasoning, or comments before or after the pseudocode.
- Your output must contain ONLY either the pseudocode or exactly "Not a coding problem".

Given Problem:
{question}
"""
    try:
        response = together.Complete.create(
            prompt=prompt,
            model=model,
            max_tokens=500,
            temperature=0.3
            
        )
        return response['choices'][0]['text'].strip()
    except Exception as e:
        return f"Error: {e}"
