import os
from openai import OpenAI
from config import OPENAI_MODEL

client = OpenAI(
    api_key=os.getenv("OPENAI_API_KEY")
)

def refine(answer: str, critique: str) -> str:
    """
    Improves an answer using critique feedback.
    Removes hallucinations and unsafe content.
    """

    response = client.chat.completions.create(
        model=OPENAI_MODEL,
        messages=[
            {
                "role": "system",
                "content": (
                    "You are an expert editor. Rewrite answers to be accurate, "
                    "safe, cautious, and well-reasoned. Do not add new facts "
                    "unless certain."
                )
            },
            {
                "role": "user",
                "content": (
                    f"Original answer:\n{answer}\n\n"
                    f"Critique:\n{critique}\n\n"
                    "Rewrite the answer addressing all issues."
                )
            }
        ],
        temperature=0.3
    )

    return response.choices[0].message.content
