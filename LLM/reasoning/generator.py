import os
from openai import OpenAI
from config import OPENAI_MODEL

client = OpenAI(api_key=os.getenv("OPENAI_API_KEY"))

def generate(context: str) -> str:
    response = client.chat.completions.create(
        model=OPENAI_MODEL,
        messages=[
            {"role": "system", "content": "You are a careful AI assistant."},
            {"role": "user", "content": context}
        ]
    )
    return response.choices[0].message.content
