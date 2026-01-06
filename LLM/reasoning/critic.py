import os
from openai import OpenAI
from config import OPENAI_MODEL

# Explicit client initialization (NO hidden env dependency)
client = OpenAI(
    api_key=os.getenv("OPENAI_API_KEY")
)

def critique(answer: str) -> str:
    """
    Critiques an AI-generated answer for:
    - factual errors
    - hallucinations
    - unsafe medical advice
    - overconfidence
    """

    response = client.chat.completions.create(
        model=OPENAI_MODEL,
        messages=[
            {
                "role": "system",
                "content": (
                    "You are a strict medical and factual reviewer. "
                    "Identify hallucinations, unsafe advice, missing disclaimers, "
                    "or incorrect reasoning."
                )
            },
            {
                "role": "user",
                "content": f"Review the following answer critically:\n\n{answer}"
            }
        ],
        temperature=0.2
    )

    return response.choices[0].message.content
