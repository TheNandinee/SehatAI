# 🏥 SehatAI - Advanced Healthcare Intelligence Platform

<div align="center">

![SehatAI Banner](https://img.shields.io/badge/SehatAI-Healthcare_AI-blue?style=for-the-badge)

**Empowering Healthcare with Artificial Intelligence**

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Python 3.8+](https://img.shields.io/badge/python-3.8+-blue.svg)](https://www.python.org/downloads/)
[![TypeScript](https://img.shields.io/badge/TypeScript-75%25-blue)](https://www.typescriptlang.org/)
[![Contributions Welcome](https://img.shields.io/badge/contributions-welcome-brightgreen.svg?style=flat)](CONTRIBUTING.md)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)](http://makeapullrequest.com)

*An extensive AI-powered healthcare platform leveraging Large Language Models (LLMs) for comprehensive health analysis, RAG-based medical knowledge retrieval, and intelligent feedback systems*

[Features](#-features) • [Installation](#-installation) • [Quick Start](#-quick-start) • [Architecture](#-architecture) • [Documentation](#-api-documentation) • [Contributing](#-contributing)

</div>

---

## 📋 Table of Contents

- [Overview](#-overview)
- [Key Features](#-key-features)
- [System Architecture](#-system-architecture)
- [Technology Stack](#-technology-stack)
- [Installation](#-installation)
- [Quick Start](#-quick-start)
- [Project Structure](#-project-structure)
- [Configuration](#-configuration)
- [API Documentation](#-api-documentation)
- [Testing](#-testing)
- [Deployment](#-deployment)
- [Contributing](#-contributing)
- [Roadmap](#-roadmap)
- [License](#-license)
- [Team](#-meet-the-team)

---

## 🌟 Overview

**SehatAI** (सेहत = Health) is a cutting-edge healthcare intelligence platform that harnesses the power of Large Language Models to revolutionize healthcare delivery, patient monitoring, and medical decision support. This comprehensive system integrates advanced AI capabilities with Retrieval-Augmented Generation (RAG), adversarial testing frameworks, and intelligent feedback systems to ensure reliable, accurate, and actionable healthcare insights.

### 🎯 Mission

To democratize access to intelligent healthcare solutions by providing a scalable, reliable, and comprehensive AI-powered platform that assists healthcare professionals and empowers patients with data-driven insights.

### ✨ What Makes SehatAI Special?

- 🤖 **Advanced LLM Integration**: Leverages state-of-the-art language models for medical query understanding and response generation
- 📚 **RAG-Based Knowledge Retrieval**: Retrieval-Augmented Generation for accurate, context-aware medical information
- 📊 **Comprehensive Health Analysis**: Multi-dimensional health data processing and interpretation
- 🔬 **Adversarial Testing Framework**: Built-in stress testing and validation to ensure system reliability
- 🔄 **Intelligent Feedback Loop**: Continuous learning and improvement through user feedback
- 🛡️ **Production-Ready**: Enterprise-grade architecture with Docker containerization
- 🔌 **Modular Architecture**: Extensible design with separate frontend, backend, and LLM layers

---

## 🚀 Key Features

### Core Capabilities

#### 🧠 LLM-Powered Intelligence
- **Natural Language Understanding**: Advanced NLP for medical terminology and patient queries
- **Context-Aware Responses**: Maintains conversation context for coherent medical consultations
- **RAG Implementation**: Retrieves relevant medical knowledge from vectorized knowledge bases
- **Custom Fine-Tuning**: Domain-specific model adaptation for healthcare scenarios

#### 📈 Health Analysis & Monitoring
- **Symptom Analysis**: Intelligent symptom tracking and correlation
- **Medical Query Processing**: Natural language medical question answering
- **Trend Detection**: Identifies patterns in patient health data over time
- **Risk Assessment**: Predictive analytics for health risk evaluation
- **Personalized Recommendations**: Tailored health advice based on individual profiles

#### 🧪 Adversarial Testing & Validation
- **Stress Testing**: Simulates high-traffic scenarios for performance validation
- **Accuracy Testing**: Validates medical information accuracy against trusted sources
- **Edge Case Testing**: Identifies and handles unusual medical scenarios
- **Performance Benchmarking**: Continuous monitoring of system response times and accuracy

#### 💬 Feedback & Learning System
- **User Feedback Collection**: Structured feedback mechanisms for continuous improvement
- **Model Performance Tracking**: Monitors LLM response quality and accuracy
- **Automated Improvement Pipeline**: Uses feedback to refine system responses

#### 🔐 Security & Deployment
- **Dockerized Architecture**: Containerized deployment for consistency and scalability
- **Data Privacy**: Built with healthcare data privacy standards in mind
- **API Security**: Secure backend API with proper authentication mechanisms

---

## 🏗️ System Architecture

SehatAI follows a modern three-tier architecture with clear separation of concerns:

```
┌─────────────────────────────────────────────────────────┐
│                    FRONTEND LAYER                        │
│         (React/TypeScript - User Interface)              │
│  • Chat Interface  • Health Dashboard  • Analytics      │
└────────────────────┬────────────────────────────────────┘
                     │ HTTP/REST API
┌────────────────────▼────────────────────────────────────┐
│                    BACKEND LAYER                         │
│          (API Server - Business Logic)                   │
│  • Request Routing  • Data Processing  • Auth           │
└────────────────────┬────────────────────────────────────┘
                     │ Internal API
┌────────────────────▼────────────────────────────────────┐
│                     LLM LAYER                            │
│    (RAG System - AI Processing & Intelligence)           │
│  • Vector Embeddings  • LLM Integration                 │
│  • Knowledge Retrieval  • Response Generation           │
│  • Adversarial Testing  • Feedback Processing           │
└─────────────────────────────────────────────────────────┘
```

### Component Breakdown

**Frontend Layer**
- Built with React and TypeScript for type safety
- Responsive UI for healthcare professionals and patients
- Real-time chat interface for medical queries
- Health analytics and visualization dashboards

**Backend Layer**
- RESTful API server handling client requests
- Request validation and data preprocessing
- Authentication and authorization
- Integration point between frontend and LLM services

**LLM Layer**
- RAG (Retrieval-Augmented Generation) implementation
- Vector database for medical knowledge storage
- LLM inference and response generation
- Adversarial testing framework
- Feedback collection and processing pipeline

---

## 💻 Technology Stack

| Component | Technology |
|-----------|-----------|
| **Frontend** | TypeScript, React, Vite |
| **Backend** | Python, FastAPI/Flask |
| **LLM Framework** | LangChain, Hugging Face Transformers |
| **Vector Store** | Pinecone/Weaviate/Chroma |
| **Database** | PostgreSQL, Redis (caching) |
| **Containerization** | Docker, Docker Compose |
| **Language Distribution** | TypeScript (75%), Python (22.2%) |

---

## 📥 Installation

### Prerequisites

- **Python** 3.8 or higher
- **Node.js** 16+ and npm
- **Docker** and Docker Compose (recommended)
- **Git**

### Method 1: Docker Installation (Recommended)

The easiest way to get started is using Docker Compose:

```bash
# Clone the repository
git clone https://github.com/TheNandinee/SehatAI.git
cd SehatAI

# Start all services using Docker Compose
docker-compose up --build

# The application will be available at:
# Frontend: http://localhost:3000
# Backend API: http://localhost:8000
```

### Method 2: Manual Installation

#### Backend Setup

```bash
# Navigate to backend directory
cd backend

# Create and activate virtual environment
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate

# Install dependencies
pip install -r requirements.txt

# Set up environment variables
cp .env.example .env
# Edit .env with your configuration

# Run the backend server
python main.py
```

#### Frontend Setup

```bash
# Navigate to frontend directory
cd frontend

# Install dependencies
npm install

# Set up environment variables
cp .env.example .env
# Edit .env with your configuration

# Start the development server
npm run dev
```

#### LLM Layer Setup

```bash
# Navigate to LLM directory
cd LLM

# Create virtual environment
python -m venv venv
source venv/bin/activate

# Install dependencies
pip install -r requirements.txt

# Configure LLM settings
cp config.example.yaml config.yaml
# Edit config.yaml with your API keys and settings

# Initialize the RAG system
python init_rag.py

# Run adversarial tests (optional)
python test_adversarial.py
```

---

## 🎯 Quick Start

### Using the Platform

1. **Start the application** using Docker or manual installation
2. **Access the frontend** at `http://localhost:3000`
3. **Login or create an account** (if authentication is enabled)
4. **Start chatting** with the medical AI assistant
5. **Analyze health data** using the dashboard features

### Example API Usage

```python
import requests

# API endpoint
api_url = "http://localhost:8000/api/v1"

# Send a medical query
response = requests.post(
    f"{api_url}/query",
    json={
        "question": "What are the symptoms of Type 2 diabetes?",
        "context": "Patient is 45 years old with family history"
    },
    headers={"Content-Type": "application/json"}
)

result = response.json()
print(f"Answer: {result['answer']}")
print(f"Confidence: {result['confidence']}")
print(f"Sources: {result['sources']}")
```

### CLI Usage

```bash
# Analyze symptoms via CLI
python -m sehatai analyze --symptoms "fever,cough,headache"

# Run stress tests
python -m sehatai test stress --duration 300 --users 100

# Process feedback data
python -m sehatai feedback process --input feedback.csv
```

---

## 📁 Project Structure

```
SehatAI/
│
├── frontend/                     # React TypeScript Frontend
│   ├── src/
│   │   ├── components/          # React components
│   │   ├── pages/               # Page components
│   │   ├── services/            # API service layer
│   │   ├── utils/               # Utility functions
│   │   └── App.tsx              # Main app component
│   ├── public/                  # Static assets
│   ├── package.json             # Node dependencies
│   └── vite.config.ts           # Vite configuration
│
├── backend/                     # Python Backend API
│   ├── api/                     # API routes and endpoints
│   │   ├── routes/              # Route handlers
│   │   ├── middleware/          # Middleware functions
│   │   └── validators/          # Input validation
│   ├── models/                  # Data models
│   ├── services/                # Business logic
│   ├── utils/                   # Utility functions
│   ├── config/                  # Configuration files
│   ├── requirements.txt         # Python dependencies
│   └── main.py                  # Application entry point
│
├── LLM/                         # Large Language Model Layer
│   ├── rag/                     # RAG implementation
│   │   ├── embeddings/          # Vector embeddings
│   │   ├── retrieval/           # Document retrieval
│   │   └── generation/          # Response generation
│   ├── models/                  # LLM model configurations
│   ├── prompts/                 # Prompt templates
│   ├── testing/                 # Adversarial testing
│   │   ├── stress_tests/        # Load testing
│   │   ├── accuracy_tests/      # Accuracy validation
│   │   └── edge_cases/          # Edge case testing
│   ├── feedback/                # Feedback system
│   │   ├── collectors/          # Feedback collection
│   │   ├── analyzers/           # Feedback analysis
│   │   └── pipeline/            # Improvement pipeline
│   ├── config.yaml              # LLM configuration
│   └── requirements.txt         # Python dependencies
│
├── docker-compose.yml           # Docker Compose configuration
├── .gitignore                   # Git ignore rules
├── package-lock.json            # NPM lock file
├── LICENSE                      # MIT License
└── README.md                    # This file
```

---

## ⚙️ Configuration

### Environment Variables

#### Backend Configuration

Create a `.env` file in the `backend/` directory:

```bash
# Application Settings
APP_NAME=SehatAI
APP_VERSION=1.0.0
ENVIRONMENT=production
DEBUG=false

# API Configuration
API_HOST=0.0.0.0
API_PORT=8000
API_KEY=your-secure-api-key

# Database Configuration
DATABASE_URL=postgresql://user:password@localhost:5432/sehatai
REDIS_URL=redis://localhost:6379/0

# Security
SECRET_KEY=your-secret-key
JWT_ALGORITHM=HS256
ACCESS_TOKEN_EXPIRE_MINUTES=30
```

#### Frontend Configuration

Create a `.env` file in the `frontend/` directory:

```bash
VITE_API_URL=http://localhost:8000/api/v1
VITE_APP_NAME=SehatAI
VITE_ENABLE_ANALYTICS=true
```

#### LLM Layer Configuration

Create a `config.yaml` file in the `LLM/` directory:

```yaml
llm:
  provider: openai  # or anthropic, cohere, huggingface
  model: gpt-4
  api_key: your-api-key-here
  temperature: 0.3
  max_tokens: 1000
  
rag:
  vector_store: pinecone  # or weaviate, chroma
  embedding_model: text-embedding-ada-002
  chunk_size: 500
  chunk_overlap: 50
  top_k: 5  # Number of relevant documents to retrieve

testing:
  adversarial:
    enabled: true
    test_cases_path: tests/adversarial_cases.json
  stress:
    max_concurrent_requests: 100
    duration_seconds: 300

feedback:
  collection_enabled: true
  auto_retrain: false
  minimum_feedback_count: 100
```

### Docker Configuration

The `docker-compose.yml` orchestrates all services:

```yaml
version: '3.8'

services:
  frontend:
    build: ./frontend
    ports:
      - "3000:3000"
    environment:
      - VITE_API_URL=http://backend:8000
    depends_on:
      - backend

  backend:
    build: ./backend
    ports:
      - "8000:8000"
    environment:
      - DATABASE_URL=postgresql://postgres:password@db:5432/sehatai
    depends_on:
      - db
      - llm-service

  llm-service:
    build: ./LLM
    ports:
      - "8001:8001"
    environment:
      - OPENAI_API_KEY=${OPENAI_API_KEY}
    volumes:
      - ./LLM/data:/app/data

  db:
    image: postgres:14
    environment:
      - POSTGRES_DB=sehatai
      - POSTGRES_PASSWORD=password
    volumes:
      - postgres_data:/var/lib/postgresql/data

volumes:
  postgres_data:
```

---

## 📚 API Documentation

### Health Analysis Endpoints

#### POST `/api/v1/analyze`

Analyze patient symptoms and provide health insights.

**Request:**
```json
{
  "patient_id": "string",
  "symptoms": ["fever", "cough", "fatigue"],
  "duration_days": 3,
  "severity": "moderate",
  "medical_history": []
}
```

**Response:**
```json
{
  "analysis_id": "uuid",
  "risk_level": "medium",
  "possible_conditions": [
    {
      "name": "Common Cold",
      "probability": 0.65,
      "description": "Viral infection of upper respiratory tract"
    }
  ],
  "recommendations": [
    "Rest and hydration",
    "Monitor temperature",
    "Consult doctor if symptoms worsen"
  ],
  "urgency": "routine"
}
```

### LLM Query Endpoints

#### POST `/api/v1/llm/query`

Submit a medical query to the LLM system.

**Request:**
```json
{
  "question": "What are the early signs of diabetes?",
  "context": "Patient is 45 years old",
  "conversation_id": "optional-uuid"
}
```

**Response:**
```json
{
  "query_id": "uuid",
  "answer": "Early signs of diabetes include...",
  "confidence": 0.92,
  "sources": [
    "Medical Database Reference #123",
    "Clinical Guidelines 2024"
  ],
  "metadata": {
    "tokens_used": 150,
    "response_time_ms": 1200,
    "model": "gpt-4"
  }
}
```

### Feedback Endpoints

#### POST `/api/v1/feedback`

Submit feedback on system responses.

**Request:**
```json
{
  "session_id": "uuid",
  "query_id": "uuid",
  "rating": 4,
  "comment": "Very helpful response",
  "accuracy": "accurate",
  "response_quality": "good"
}
```

**Response:**
```json
{
  "feedback_id": "uuid",
  "status": "received",
  "timestamp": "2026-01-18T10:30:00Z"
}
```

For complete interactive API documentation:
- **Swagger UI**: `http://localhost:8000/docs`
- **ReDoc**: `http://localhost:8000/redoc`

---

## 🧪 Testing

### Running Tests

#### Unit Tests

```bash
# Backend tests
cd backend
pytest tests/unit/ -v

# Frontend tests
cd frontend
npm test

# LLM layer tests
cd LLM
pytest tests/ -v
```

#### Integration Tests

```bash
# Run full integration test suite
docker-compose -f docker-compose.test.yml up --abort-on-container-exit
```

#### Adversarial Testing

```bash
cd LLM
python -m testing.adversarial_test --config config/adversarial_config.yaml
```

#### Stress Testing

```bash
# Run stress tests
cd LLM
python -m testing.stress_test --users 100 --duration 300

# Generate performance report
python -m testing.generate_report --output reports/stress_test_results.html
```

### Test Coverage

```bash
# Backend coverage
cd backend
pytest --cov=. --cov-report=html

# View coverage report
open htmlcov/index.html
```

### Continuous Integration

The project uses GitHub Actions for automated testing:

```yaml
# .github/workflows/test.yml
name: Tests

on: [push, pull_request]

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - name: Run tests
        run: docker-compose -f docker-compose.test.yml up --abort-on-container-exit
```

---

## 🚀 Deployment

### Production Deployment Checklist

- [ ] Environment variables configured
- [ ] Database migrations applied
- [ ] SSL/TLS certificates installed
- [ ] Monitoring and logging enabled
- [ ] Backup strategy implemented
- [ ] Rate limiting configured
- [ ] Security headers configured
- [ ] Health check endpoints tested
- [ ] Load balancer configured
- [ ] Disaster recovery plan documented

### Docker Production Deployment

```bash
# Build production images
docker-compose -f docker-compose.prod.yml build

# Start services
docker-compose -f docker-compose.prod.yml up -d

# View logs
docker-compose logs -f

# Scale services
docker-compose up -d --scale backend=3
```

### Kubernetes Deployment

```bash
# Create namespace
kubectl create namespace sehatai

# Apply configurations
kubectl apply -f k8s/

# Check deployment
kubectl get pods -n sehatai
kubectl get services -n sehatai

# View logs
kubectl logs -f deployment/sehatai-backend -n sehatai
```

### Environment-Specific Configurations

**Development**
```bash
docker-compose -f docker-compose.dev.yml up
```

**Staging**
```bash
docker-compose -f docker-compose.staging.yml up
```

**Production**
```bash
docker-compose -f docker-compose.prod.yml up -d
```

---

## 🤝 Contributing

We welcome contributions from the community! Here's how you can help make SehatAI better:

### Getting Started

1. **Fork the repository**
2. **Create a feature branch**
   ```bash
   git checkout -b feature/amazing-feature
   ```
3. **Make your changes**
4. **Add tests** for new functionality
5. **Ensure all tests pass**
   ```bash
   pytest
   npm test
   ```
6. **Commit your changes**
   ```bash
   git commit -m 'Add amazing feature'
   ```
7. **Push to the branch**
   ```bash
   git push origin feature/amazing-feature
   ```
8. **Open a Pull Request**

### Contribution Guidelines

- Follow **PEP 8** style guide for Python code
- Use **TypeScript** strict mode for frontend code
- Write **clear, descriptive commit messages**
- Add **docstrings** to all functions and classes
- Include **unit tests** for new features
- Update **documentation** as needed
- Ensure **backward compatibility**
- Keep PRs focused and atomic

### Code of Conduct

Please read our [CODE_OF_CONDUCT.md](CODE_OF_CONDUCT.md) before contributing.

### Areas for Contribution

- 🐛 **Bug fixes**
- ✨ **New features**
- 📝 **Documentation improvements**
- 🧪 **Test coverage expansion**
- 🌍 **Internationalization**
- ♿ **Accessibility improvements**
- 🎨 **UI/UX enhancements**
- 🔒 **Security improvements**

---

## 🗺️ Roadmap

### Current Version (v1.0)

✅ Core LLM integration with RAG  
✅ Basic health analysis functionality  
✅ Adversarial testing framework  
✅ Feedback collection system  
✅ REST API with documentation  
✅ Docker containerization  
✅ Frontend-backend integration  

### Upcoming (v1.1)

🔄 Multi-language support  
🔄 Enhanced ML models  
🔄 Mobile app integration  
🔄 Real-time monitoring dashboard  
🔄 Advanced analytics and reporting  
🔄 Voice interface support  

### Future (v2.0)

📅 Integration with EHR systems  
📅 Telemedicine features  
📅 Predictive health modeling  
📅 Wearable device integration  
📅 Blockchain for health records  
📅 Multi-modal AI (image, voice, text)  

---

## 📄 License

This project is licensed under the **MIT License** - see the [LICENSE](LICENSE) file for details.

```
MIT License

Copyright (c) 2026 Nandinee

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
```

---

## 👥 Meet the Team

SehatAI is built through collaborative engineering, combining expertise in AI and Full Stack Development.

<table>
  <tr>
    <td align="center">
      <a href="https://github.com/TheNandinee">
        <img src="https://github.com/TheNandinee.png" width="100px;" alt="Nandinee"/><br />
        <sub><b>Nandinee</b></sub>
      </a><br />
      <sub>Project Lead & Core Developer</sub><br />
      <sub>Architected the AI logic, LLM integration, RAG system, and overall system design.</sub>
    </td>
    <td align="center">
      <a href="https://github.com/theparidhisharma">
        <img src="https://github.com/theparidhisharma.png" width="100px;" alt="Paridhi Sharma"/><br />
        <sub><b>Paridhi Sharma</b></sub>
      </a><br />
      <sub>Full Stack Developer</sub><br />
      <sub>Developed the frontend interface and optimized full-stack integration.</sub>
    </td>
  </tr>
</table>

---

## 🙏 Acknowledgments

SehatAI is built on the shoulders of giants. We're grateful to the maintainers of:

- **[LangChain](https://github.com/langchain-ai/langchain)** - LLM orchestration and RAG framework
- **[Hugging Face Transformers](https://github.com/huggingface/transformers)** - Model infrastructure
- **[FastAPI](https://github.com/tiangolo/fastapi)** - Modern web framework for Python
- **[React](https://react.dev/)** - Frontend UI framework
- **[Vite](https://vitejs.dev/)** - Next-generation frontend tooling
- **[Docker](https://www.docker.com/)** - Containerization platform
- **[Pytest](https://pytest.org/)** - Testing framework

---

## 📊 Project Stats

![GitHub stars](https://img.shields.io/github/stars/TheNandinee/SehatAI?style=social)
![GitHub forks](https://img.shields.io/github/forks/TheNandinee/SehatAI?style=social)
![GitHub watchers](https://img.shields.io/github/watchers/TheNandinee/SehatAI?style=social)
![GitHub last commit](https://img.shields.io/github/last-commit/TheNandinee/SehatAI)
![GitHub issues](https://img.shields.io/github/issues/TheNandinee/SehatAI)
![GitHub pull requests](https://img.shields.io/github/issues-pr/TheNandinee/SehatAI)

---

## 📞 Support & Contact

- **Issues**: [GitHub Issues](https://github.com/TheNandinee/SehatAI/issues)
- **Discussions**: [GitHub Discussions](https://github.com/TheNandinee/SehatAI/discussions)
- **Email**: sehatai@example.com

---

## ⭐ Star History

If you find SehatAI helpful, please consider giving it a star! ⭐

[![Star History Chart](https://api.star-history.com/svg?repos=TheNandinee/SehatAI&type=Date)](https://star-history.com/#TheNandinee/SehatAI&Date)

---

<div align="center">

**Made with ❤️ for better healthcare**

[⬆ Back to Top](#-sehatai---advanced-healthcare-intelligence-platform)

</div>
