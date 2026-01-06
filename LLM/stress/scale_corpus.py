import os
import shutil

SOURCE_DIRS = ["data/who", "data/cdc"]
TARGET_DIR = "data/stress"

os.makedirs(TARGET_DIR, exist_ok=True)

copies = 5  # increase to 10, 20 later

for src in SOURCE_DIRS:
    for i in range(copies):
        dst = os.path.join(TARGET_DIR, f"{os.path.basename(src)}_{i}")
        shutil.copytree(src, dst, dirs_exist_ok=True)

print(f"Corpus scaled by {copies}x")
