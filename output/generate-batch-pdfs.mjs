#!/usr/bin/env node
// One-shot: generate tailored CVs for Bland AI, ElevenLabs, Glean
import { readFileSync, writeFileSync } from 'fs';
import { execSync } from 'child_process';
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = resolve(__dirname, '..');
const template = readFileSync(resolve(ROOT, 'templates/cv-template.html'), 'utf-8');
const DATE = '2026-04-17';

const CONTACT = {
  NAME: 'Pradhyuman Yadav',
  PHONE: '+15712594892',
  EMAIL: 'pradhyuman680@gmail.com',
  LINKEDIN_URL: 'https://linkedin.com/in/pradhyuman-yadav',
  LINKEDIN_DISPLAY: 'linkedin.com/in/pradhyuman-yadav',
  PORTFOLIO_URL: 'https://thepk.in/',
  PORTFOLIO_DISPLAY: 'thepk.in',
  LOCATION: 'San Jose, CA',
  LANG: 'en',
  PAGE_WIDTH: '8.5in',
  SECTION_SUMMARY: 'Professional Summary',
  SECTION_COMPETENCIES: 'Core Competencies',
  SECTION_EXPERIENCE: 'Work Experience',
  SECTION_PROJECTS: 'Projects',
  SECTION_EDUCATION: 'Education',
  SECTION_CERTIFICATIONS: 'Certifications',
  SECTION_SKILLS: 'Skills',
};

function tag(cls, txt) { return `<span class="${cls}">${txt}</span>`; }
function ctag(txt) { return tag('competency-tag', txt); }

// ── SHARED EXPERIENCE BLOCKS ────────────────────────────────────────────────

const COLABERRY_FDE = `
<div class="job">
  <div class="job-header">
    <span class="job-company">Colaberry</span>
    <span class="job-period">Jul 2025 – Dec 2025</span>
  </div>
  <div class="job-role">AI Software Engineer</div>
  <ul>
    <li>Deployed production LLM multi-agent system for Continental Expedited Services achieving <strong>92% accuracy</strong> across <strong>50K+ weekly queries</strong> — RAG architecture with unified vector knowledge base powering both Voice and Email AI agents.</li>
    <li>Modernized legacy logistics operations into an agentic pipeline that autonomously triages inbound requests — routing vehicle type, quoting, scheduling, and on-route inquiries via intelligent email dispatch.</li>
    <li>Reduced model inference latency <strong>65% (3.2s to 1.1s)</strong> across 100+ concurrent requests through context engineering — prompt structure, message history windowing, and token budgeting against GPT-4/Claude APIs.</li>
    <li>Improved system reliability with LLM guardrails and auto-recovery mechanisms, reducing model drift incidents and ensuring consistent agent behavior across Voice and Email pipelines.</li>
  </ul>
</div>`;

const TIVIO_FDE = `
<div class="job">
  <div class="job-header">
    <span class="job-company">Total Tivio (Co-Founded Startup)</span>
    <span class="job-period">Sep 2024 – Jul 2025</span>
  </div>
  <div class="job-role">Co-Founder &amp; AI Software Engineer</div>
  <ul>
    <li>Co-founded a gamified medical video platform; built AI content recommendation engine using embedding similarity search with Elasticsearch and AI-powered learning-path generation for clinicians.</li>
    <li>Added AI transcription pipeline (Whisper API + AI summarization) with semantic search (vector embeddings + FAISS) for surgical procedure discovery across training library.</li>
    <li>Increased deployment velocity <strong>50%</strong> with CI/CD (Docker, GitHub Actions); uptime improved <strong>40%</strong> with AWS auto-scaling.</li>
    <li>Platform and AI codebase acquired by a private buyer — packaged and transferred prompt libraries, embedding indexes, and inference configs.</li>
  </ul>
</div>`;

const QUANTA_FDE = `
<div class="job">
  <div class="job-header">
    <span class="job-company">Quanta Manufacturing Fremont (Client — Meta)</span>
    <span class="job-period">Dec 2025 – Present</span>
  </div>
  <div class="job-role">Technical Lead &amp; Engineer</div>
  <ul>
    <li>Led engineering team to successful on-site deployment at Meta's Facility in New Albany, Ohio — established testing environments and automated validation pipelines.</li>
    <li>Integrating AI-driven diagnostics into testing pipeline, improving fault detection accuracy and reducing client-impacting downtime.</li>
  </ul>
</div>`;

const OPTUM = `
<div class="job">
  <div class="job-header">
    <span class="job-company">Optum (UnitedHealth Group)</span>
    <span class="job-period">Jul 2022 – Aug 2023</span>
  </div>
  <div class="job-role">Software Engineer, Full Stack</div>
  <ul>
    <li>Built real-time data pipeline (Spring Boot, Kafka, Hibernate, MySQL) powering downstream AI analytics; <strong>35% throughput gain</strong> on healthcare claims processing.</li>
    <li>Led Quarkus migration POC — <strong>70% startup time reduction</strong>, <strong>50% memory savings</strong>, enabling AI microservices without heavy infrastructure.</li>
    <li>Built data validation and enrichment pipeline with schema enforcement; cut data quality issues feeding into AI systems by <strong>40%</strong>.</li>
  </ul>
</div>`;

const COLABERRY_AGENTIC = `
<div class="job">
  <div class="job-header">
    <span class="job-company">Colaberry</span>
    <span class="job-period">Jul 2025 – Dec 2025</span>
  </div>
  <div class="job-role">AI Software Engineer</div>
  <ul>
    <li>Deployed production LLM multi-agent system achieving <strong>92% accuracy</strong> across <strong>50K+ weekly queries</strong> — RAG architecture with vector knowledge base, session lifecycle management, and tool routing across Voice and Email agents.</li>
    <li>Reduced model inference latency <strong>65% (3.2s to 1.1s)</strong> across 100+ concurrent requests — context engineering, message history windowing, token budgeting.</li>
    <li>Implemented LLM guardrails with auto-recovery mechanisms and fault isolation, ensuring consistent agent behavior and reducing model drift across pipelines.</li>
    <li>Built agentic pipeline with intelligent request triage — routing vehicle type, quoting, scheduling, and on-route inquiries to respective teams via structured tool execution.</li>
  </ul>
</div>`;

const TIVIO_AGENTIC = `
<div class="job">
  <div class="job-header">
    <span class="job-company">Total Tivio (Co-Founded Startup)</span>
    <span class="job-period">Sep 2024 – Jul 2025</span>
  </div>
  <div class="job-role">Co-Founder &amp; AI Software Engineer</div>
  <ul>
    <li>Built content recommendation engine using embedding similarity search (Elasticsearch + FAISS) and AI-powered learning-path generation with semantic search.</li>
    <li>Added AI transcription pipeline (Whisper API + LLM summarization) with vector embeddings for semantic retrieval across training library.</li>
    <li>Platform acquired by private buyer — transferred prompt libraries, embedding indexes, and inference configs.</li>
  </ul>
</div>`;

const OPTUM_AGENTIC = `
<div class="job">
  <div class="job-header">
    <span class="job-company">Optum (UnitedHealth Group)</span>
    <span class="job-period">Jul 2022 – Aug 2023</span>
  </div>
  <div class="job-role">Software Engineer, Full Stack</div>
  <ul>
    <li>Built real-time data pipeline (Spring Boot, Kafka, Hibernate, MySQL) — <strong>35% throughput gain</strong> on healthcare claims; powered downstream AI analytics.</li>
    <li>Led Quarkus migration POC — <strong>70% startup time reduction</strong>, <strong>50% memory savings</strong>; enabled AI microservices without heavy infra overhead.</li>
    <li>Implemented automated alerting and anomaly flagging across 10+ services; built data validation pipeline cutting data quality issues by <strong>40%</strong>.</li>
  </ul>
</div>`;

// ── SHARED PROJECT BLOCKS ────────────────────────────────────────────────────

const PROJ_EDGE_LLM = `
<div class="project">
  <div><span class="project-title">Edge-Deployed AI Language Model Inference Platform</span> <span class="project-badge">thepk.in</span></div>
  <div class="project-desc">Self-hosted quantized Llama 3 (GGUF/4-bit via llama.cpp) on edge hardware — <strong>75% less memory</strong>, <strong>90% cheaper</strong> than cloud LLM APIs. Secure inference API (FastAPI + token auth + rate limiting) with streaming chat; <strong>&lt;500ms time-to-first-token</strong>, <strong>99%+ uptime</strong>. Containerized serving stack with prompt templating, context window management, and conversation memory.</div>
</div>`;

const PROJ_SAFERIDE = `
<div class="project">
  <div><span class="project-title">SafeRide — AI-Powered Ride Safety Platform</span> <span class="project-badge">saferide.co.in</span></div>
  <div class="project-desc">Real-time telemetry processing platform (GPS, accelerometer, gyroscope) with ML anomaly detection — <strong>94% detection accuracy</strong>. NLP-based incident reporting (fine-tuned BERT) auto-escalating high-risk events; cut response time <strong>78%</strong> (18 min to 4 min). FastAPI + Redis risk-scoring engine: <strong>10K+ events/minute</strong>, <strong>&lt;200ms p99 latency</strong>. Grew to <strong>8K+ active riders</strong> across 3 cities.</div>
</div>`;

const PROJ_PLATFORM = `
<div class="project">
  <div><span class="project-title">Self-Hosted Scalable AI Web Platform</span> <span class="project-badge">thepk.in</span></div>
  <div class="project-desc">Full-stack AI platform (Next.js, Python, FastAPI) for <strong>10K+ weekly users</strong> with LLM chat, AI image generation, and RAG-powered document Q&amp;A. Self-hosted AI services with FAISS vector storage and response caching for sub-second retrieval. Automated deployment lifecycle with GitHub Actions and Docker: health monitoring, version rollback, zero-downtime deploys.</div>
</div>`;

const EDUCATION = `
<div class="edu-item">
  <div class="edu-header">
    <span class="edu-title">M.S. Computer Science <span class="edu-org">— George Washington University</span></span>
    <span class="edu-year">May 2025</span>
  </div>
  <div class="edu-desc">GPA: 3.8 | Washington, DC</div>
</div>`;

const SKILLS = `
<div>
  <p style="font-size:10.5px;color:#333;line-height:1.8;">
    <span class="skill-category">Languages:</span> Python, Java, JavaScript/TypeScript, SQL, C/C++, Bash<br>
    <span class="skill-category">AI &amp; GenAI:</span> GPT-4/Claude/Gemini API, Agent Orchestration, RAG Architecture, LangChain, LlamaIndex, CrewAI, AutoGen, Guardrails AI<br>
    <span class="skill-category">Vector &amp; Search:</span> Pinecone, ChromaDB, FAISS, Weaviate, pgvector, Elasticsearch<br>
    <span class="skill-category">AI Infrastructure:</span> Ollama, vLLM, llama.cpp, Model Quantization (GGUF/GPTQ/AWQ), Streaming Inference, Token Optimization<br>
    <span class="skill-category">Cloud &amp; DevOps:</span> AWS (Bedrock, Lambda, EC2, S3, SageMaker), GCP (Vertex AI), Docker, Kubernetes, GitHub Actions<br>
    <span class="skill-category">Frameworks:</span> FastAPI, Spring Boot, React, Next.js, Node.js, PostgreSQL, MongoDB, Redis, Kafka
  </p>
</div>`;

// ── CV DEFINITIONS ────────────────────────────────────────────────────────────

const CVS = [
  {
    slug: 'bland-ai',
    reportFile: 'reports/016-bland-2026-04-17.md',
    pdfField: 'output/cv-pradhyuman-yadav-bland-ai-2026-04-17.pdf',
    appRow: 20, // row index in applications.md (1-indexed header + rows)
    SUMMARY_TEXT: `Forward Deployed Engineer who ships production AI to enterprise clients. Deployed a live LLM multi-agent voice and email system for a logistics client — 92% accuracy, 50K+ weekly queries, 65% latency reduction. Co-founded an AI platform acquired by a private buyer. Rapid prototyping, end-to-end delivery ownership, and deep comfort with LLM/AI SDK integration into real-world applications.`,
    COMPETENCIES: ['Voice AI Agent Deployment', 'LLM Integration &amp; Orchestration', 'REST/JSON API Integration', 'Python &amp; JavaScript', 'End-to-End Client Delivery', 'Rapid Prototyping', 'Agent Automation Systems', 'Startup to Production'].map(ctag).join('\n      '),
    EXPERIENCE: [COLABERRY_FDE, TIVIO_FDE, QUANTA_FDE, OPTUM].join('\n'),
    PROJECTS: [PROJ_EDGE_LLM, PROJ_SAFERIDE, PROJ_PLATFORM].join('\n'),
    EDUCATION,
    CERTIFICATIONS: '',
    SKILLS,
  },
  {
    slug: 'elevenlabs',
    reportFile: 'reports/017-elevenlabs-2026-04-17.md',
    pdfField: 'output/cv-pradhyuman-yadav-elevenlabs-2026-04-17.pdf',
    appRow: 21,
    SUMMARY_TEXT: `Forward Deployed Engineer with deep expertise in enterprise AI integration and end-to-end project execution. Architected and deployed LLM-powered voice and email agent system serving 50K+ weekly queries at 92% accuracy for a Fortune-class logistics client. Co-founded an AI platform acquired by a private buyer. Strong Python and API integration skills; experienced owning complex, high-impact challenges with customer engineering teams.`,
    COMPETENCIES: ['Enterprise AI Integration', 'Python &amp; FastAPI', 'Voice AI &amp; Audio AI', 'API Architecture &amp; Integration', 'End-to-End Project Ownership', 'Multi-Agent Deployment', 'Software Architecture', 'Customer Collaboration'].map(ctag).join('\n      '),
    EXPERIENCE: [COLABERRY_FDE, TIVIO_FDE, QUANTA_FDE, OPTUM].join('\n'),
    PROJECTS: [PROJ_EDGE_LLM, PROJ_SAFERIDE, PROJ_PLATFORM].join('\n'),
    EDUCATION,
    CERTIFICATIONS: '',
    SKILLS,
  },
  {
    slug: 'glean',
    reportFile: 'reports/027-glean-2026-04-17.md',
    pdfField: 'output/cv-pradhyuman-yadav-glean-2026-04-17.pdf',
    appRow: 31,
    SUMMARY_TEXT: `AI Software Engineer specializing in production agentic runtime systems — session lifecycle management, tool &amp; function calling, LLM routing, streaming inference, and fault isolation. Deployed multi-agent LLM system with RAG architecture: 92% accuracy, 50K+ weekly queries, 65% latency reduction. Self-hosted quantized inference platform (&lt;500ms TTFT). San Jose-based; SF Bay Area hybrid commute works well.`,
    COMPETENCIES: ['Agentic Runtime Systems', 'LLM Orchestration &amp; Routing', 'Tool &amp; Function Calling', 'Streaming Inference', 'Fault Isolation &amp; Guardrails', 'RAG Architecture', 'Observability &amp; Monitoring', 'Python / FastAPI / Redis'].map(ctag).join('\n      '),
    EXPERIENCE: [COLABERRY_AGENTIC, TIVIO_AGENTIC, QUANTA_FDE, OPTUM_AGENTIC].join('\n'),
    PROJECTS: [PROJ_EDGE_LLM, PROJ_PLATFORM, PROJ_SAFERIDE].join('\n'),
    EDUCATION,
    CERTIFICATIONS: '',
    SKILLS,
  },
];

// ── GENERATE ─────────────────────────────────────────────────────────────────

for (const cv of CVS) {
  let html = template;
  const vars = { ...CONTACT, ...cv };
  for (const [k, v] of Object.entries(vars)) {
    if (typeof v === 'string') {
      html = html.replaceAll(`{{${k}}}`, v);
    }
  }

  const htmlPath = resolve(ROOT, `output/cv-pradhyuman-yadav-${cv.slug}.html`);
  writeFileSync(htmlPath, html, 'utf-8');
  console.log(`\nWritten: ${htmlPath}`);

  try {
    const cmd = `node "${resolve(ROOT, 'generate-pdf.mjs')}" "${htmlPath}" "${resolve(ROOT, cv.pdfField)}" --format=letter`;
    console.log(`Running: ${cmd}`);
    execSync(cmd, { cwd: ROOT, stdio: 'inherit' });
    console.log(`PDF done: ${cv.pdfField}`);
  } catch (e) {
    console.error(`PDF failed for ${cv.slug}:`, e.message);
  }
}

console.log('\nAll done. PDFs in output/');
