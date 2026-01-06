import json
from datetime import datetime

FAILURE_LOG = "feedback/failure_memory.jsonl"

def log_failure(query, attack_type, evaluation):
    record = {
        "timestamp": datetime.utcnow().isoformat(),
        "query": query,
        "attack_type": attack_type,
        "flags": evaluation["flags"],
        "score": evaluation["score"]
    }

    with open(FAILURE_LOG, "a") as f:
        f.write(json.dumps(record) + "\n")
