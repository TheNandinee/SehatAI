def score(critique: str) -> float:
    red_flags = ["hallucination", "unsafe", "incorrect", "misleading"]
    for flag in red_flags:
        if flag in critique.lower():
            return 0.4
    return 0.85
