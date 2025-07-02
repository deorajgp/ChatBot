import os
from dotenv import load_dotenv

load_dotenv()

def get_together_api_key():
    return os.getenv("TOGETHER_API_KEY")