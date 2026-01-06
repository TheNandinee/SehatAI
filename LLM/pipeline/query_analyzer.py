from openai import OpenAI
from config import OPENAI_MODEL

client = OpenAI()

def is_abstract_or_indirect(query: str) -> bool:
    """
    Uses a cheap GPT call to determine whether the query
    is metaphorical, abstract, or indirect.
    """
    response = client.chat.completions.create(
        model=OPENAI_MODEL,
        messages=[
            {
                "role": "system",
                "content": (
                    "Decide whether the user query is indirect, metaphorical, "
                    "emotion-based, or lacks explicit medical terminology. "
                    "Answer ONLY with YES or NO."
                ),
            },
            {"role": "user", "content": query},
        ],
        temperature=0,
    )

    return response.choices[0].message.content.strip().upper() == "YES"
