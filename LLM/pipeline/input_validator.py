def validate_input(user_input: str) -> bool:
    if not user_input:
        return False
    if len(user_input.strip()) < 5:
        return False
    return True
