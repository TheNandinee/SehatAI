from openai import OpenAI
from config import OPENAI_MODEL

client = OpenAI()

def expand_query(query: str) -> str:
    """
    Converts vague / metaphorical queries into
    explicit, medically-grounded search queries.
    """
    response = client.chat.completions.create(
        model=OPENAI_MODEL,
        messages=[
            {
                "role": "system",
                "content": (
                    "Rewrite the user's query into a clear, explicit medical search query. "
                    "Do not answer the question. Only rewrite it."
                ),
            },
            {"role": "user", "content": query},
        ],
        temperature=0,
    )

    return response.choices[0].message.content.strip()

def conservative_expand_query(query: str) -> str:
    """
    A safer expansion strategy used when the system
    has a history of hallucination failures.
    """
    response = client.chat.completions.create(
        model=OPENAI_MODEL,
        messages=[
            {
                "role": "system",
                "content": (
                    "Rewrite the query into a conservative medical search query. "
                    "Avoid adding new conditions or speculative causes. "
                    "Use general symptom-based language only."
                ),
            },
            {"role": "user", "content": query},
        ],
        temperature=0,
    )

    return response.choices[0].message.content.strip()
