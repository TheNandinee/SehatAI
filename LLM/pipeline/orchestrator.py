from pipeline.input_validator import validate_input
from pipeline.context_builder import build_context
from reasoning.generator import generate
from reasoning.critic import critique
from reasoning.refiner import refine
from evaluation.scoring import score

def run_pipeline(user_input: str) -> str:
    if not validate_input(user_input):
        return "Invalid input."

    context = build_context(user_input)

    draft = generate(context)
    review = critique(draft)
    final = refine(draft, review)

    _ = score(review)

    return final
