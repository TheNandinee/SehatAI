FROM python:3.10-slim

WORKDIR /app

# Copy requirements first (better caching)
COPY backend/requirements.txt /app/requirements.txt
RUN pip install --no-cache-dir -r requirements.txt

# Copy entire repo so LLM/ and analyzer/ exist
COPY . /app

EXPOSE 8000

CMD ["uvicorn", "backend.main:app", "--host", "0.0.0.0", "--port", "8000"]
