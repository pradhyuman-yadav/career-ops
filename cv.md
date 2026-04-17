# Pradhyuman Yadav

San Jose, California, United States | +15712594892 | pradhyuman680@gmail.com | [LinkedIn](https://linkedin.com/in/pradhyuman-yadav) | [GitHub](https://github.com/pradhyuman-yadav) | [Portfolio](https://thepk.in/)

---

## Summary

AI Software Engineer with 2.5+ years building production AI systems, LLM-powered applications, and scalable backend infrastructure. Hands-on with GPT-4/Claude API integration, RAG pipelines, agent orchestration, vector search, and self-hosted AI deployment. Shipped AI products to 10K+ users, built a platform serving 50K+ weekly, and co-founded a startup that got acquired. MS in Computer Science from George Washington University.

---

## Skills

- **Languages:** Python, Java, JavaScript/TypeScript, SQL, C/C++, Bash
- **AI & GenAI:** AI Integration (GPT-4, Claude, Gemini API), AI Agent Orchestration, RAG Architecture, LangChain, LlamaIndex, CrewAI, AutoGen, Function Calling, Prompt Engineering, Guardrails AI
- **Vector & Search:** Pinecone, ChromaDB, FAISS, Weaviate, pgvector, Elasticsearch, Embedding Generation & Optimization
- **AI Infrastructure:** AI Deployment (Ollama, vLLM, llama.cpp), Model Quantization (GGUF, GPTQ, AWQ), Streaming Inference, Token Optimization, API Gateway Design
- **Cloud & DevOps:** AWS (Bedrock, Lambda, EC2, S3, SageMaker), GCP (Vertex AI), Docker, Kubernetes, CI/CD, Jenkins, GitHub Actions, Linux
- **Frameworks & Data:** FastAPI, Spring Boot, React, Next.js, Node.js, PostgreSQL, MongoDB, Redis, Kafka, RabbitMQ, REST APIs, Microservices

---

## Work Experience

### Quanta Manufacturing Fremont (Client — Meta) | Technical Lead & Engineer
*Dec 2025 – Present*

- Led an engineering team to successful on-site deployment at Meta's Facility in New Albany, Ohio, developing and modifying automated testing scripts and establishing new testing environments that streamlined the overall validation pipeline.
- Integrating AI-driven diagnostics into the testing pipeline, improving fault detection accuracy and reducing client-impacting downtime, while building and modernizing testing environments that increased overall validation efficiency.

### Colaberry | AI Software Engineer
*Jul 2025 – Dec 2025*

- Deployed production LLM multi-agent system for a logistics client (Continental Expedited Services) achieving **92% accuracy** across **50K+ weekly queries** by implementing RAG architecture with a unified vector knowledge base powering both Voice and Email AI agents.
- Modernized legacy logistics operations into an agentic pipeline that autonomously triages inbound requests — routing vehicle type, quoting, scheduling, and on-route inquiries to respective teams via intelligent email dispatch.
- Reduced model inference latency by **65% (3.2s → 1.1s)** across 100+ concurrent requests through context engineering — optimizing prompt structure, message history windowing, and token budgeting against GPT-4/Claude APIs.
- Improved system reliability by implementing LLM guardrails with auto-recovery mechanisms, reducing model drift incidents and ensuring consistent agent behavior across Voice and Email pipelines.

### Total Tivio (Co-Founded Startup) | Co-Founder & AI Software Engineer
*Sep 2024 – Jul 2025*

- Co-founded a gamified medical video platform and built a content recommendation engine using embedding similarity search with Elasticsearch and AI-powered learning-path generation, enabling personalized video suggestions for clinicians.
- Added an AI transcription pipeline (Whisper API + AI summarization) with semantic search (vector embeddings + FAISS) so users could find specific surgical procedures across the training library.
- Increased deployment velocity **50%** with CI/CD (Docker, GitHub Actions); uptime improved **40%** with AWS auto-scaling.
- Platform and AI codebase acquired by a private buyer. Packaged and transferred everything including prompt libraries, embedding indexes, and inference configs.

### Optum (UnitedHealth Group — Fortune 3) | Software Engineer, Full Stack
*Jul 2022 – Aug 2023*

- Built a real-time data pipeline (Spring Boot, Kafka, Hibernate, MySQL) that powered downstream AI analytics; **35% throughput gain** on healthcare claims processing.
- Found and fixed production bottlenecks across 10+ services; set up automated alerting and anomaly flagging system.
- Led the Quarkus migration POC — **70% startup time reduction**, **50% memory savings**, making it viable to run AI microservices without heavy infra.
- Built a data validation and enrichment pipeline with schema enforcement; cut data quality issues feeding into AI systems by **40%**.

---

## Projects

### SafeRide — AI-Powered Ride Safety Platform | [saferide.co.in](https://saferide.co.in)
*Aug 2023 – Jun 2024*

- Built an AI-driven safety platform for ride-hailing services that uses real-time telemetry (GPS, accelerometer, gyroscope) and ML anomaly detection to flag dangerous driving behavior — hard braking, sharp turns, speeding — with **94% detection accuracy**.
- Engineered an NLP-based incident reporting system using fine-tuned BERT embeddings that classifies rider safety complaints and auto-escalates high-risk incidents, cutting average response time from **18 minutes → 4 minutes** (78% reduction).
- Deployed a real-time risk scoring engine (FastAPI + Redis) that processes **10K+ ride events/minute**, providing live safety scores to a React dashboard consumed by fleet operators; maintained **<200ms p99 latency**.
- Grew to **8K+ active riders** and **300+ registered drivers** across 3 cities, achieving a **4.7/5 rider safety satisfaction score** based on post-ride surveys.
- Designed a driver coaching module using LLM-generated feedback summaries (GPT-4 API) personalized per driver's weekly telemetry, leading to a **22% reduction in flagged incidents** within 30 days of adoption.

### Edge-Deployed AI Language Model Inference Platform | [thepk.in](https://thepk.in)
*Nov 2025*

- Self-hosted a quantized Llama 3 model (GGUF/4-bit via llama.cpp) on edge hardware — **75% less memory**, **90% cheaper** than cloud LLM APIs.
- Built a secure inference API (FastAPI + token auth + rate limiting) with streaming chat; **<500ms time-to-first-token**, **99%+ uptime**.
- Containerized the entire serving stack (Docker) with prompt templating, context window management, and conversation memory for multi-turn chats.

### Self-Hosted Scalable Web Platform | [thepk.in](https://thepk.in)
*May 2025*

- Built a full-stack AI platform (Next.js, Python, FastAPI) for **10K+ weekly users** with LLM chat, AI image generation, and RAG-powered document Q&A.
- Running self-hosted AI services with embedding search, FAISS vector storage, and response caching for sub-second retrieval.
- Automated the AI deployment lifecycle with GitHub Actions and Docker: health monitoring, version rollback, zero-downtime deploys.

---

## Education

**George Washington University** — M.S. Computer Science (GPA: 3.8) | Washington DC | May 2025
