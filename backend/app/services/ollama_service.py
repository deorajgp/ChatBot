import requests

def get_ollama_response(question: str, model="codellama:7b-instruct"):
    url = "http://localhost:11434/api/chat"
    prompt = f"""
You are a coding assistant.

Your task is to analyze the given coding problem and respond with two solutions (Optimal and Brute Force) in the following format:

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

    payload = {
        "model": model,
        "messages": [{"role": "user", "content": prompt}],
        "stream": False
    }

    try:
        response = requests.post(url, json=payload)
        response.raise_for_status()
        return response.json()['message']['content'].strip()
    except Exception as e:
        return f"Error from Ollama: {e}"