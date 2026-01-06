from dotenv import load_dotenv
load_dotenv()  

from pipeline.orchestrator import run_pipeline

while True:
    query = input(">> ")
    print(run_pipeline(query))
