import json
from collections import Counter

FAILURE_LOG = "feedback/failure_memory.jsonl"

def analyze_failures():
    attack_counter = Counter()
    flag_counter = Counter()

    with open(FAILURE_LOG, "r") as f:
        for line in f:
            record = json.loads(line)
            attack_counter[record["attack_type"]] += 1
            for flag, triggered in record["flags"].items():
                if triggered:
                    flag_counter[flag] += 1

    return {
        "attack_frequency": attack_counter,
        "flag_frequency": flag_counter
    }
