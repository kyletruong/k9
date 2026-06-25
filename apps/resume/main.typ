#import "./lib.typ": *

#set list(indent: 1em)

#show: resume.with(
  author: "Kyle Truong",
  email: "kyletruong@gmail.com",
  phone: "949-632-0319",
  accent-color: "#26428b",
  font: "New Computer Modern",
  paper: "us-letter",
  author-position: center,
  personal-info-position: center,
  github: "github.com/kyletruong",
  linkedin: "linkedin.com/in/kyletruong",
  personal-site: "k9.dev",
)

== Experience

#entry(
  top-left: strong("Niantic (8th Wall Acquisition)"),
  top-right: "Palo Alto, CA",
  bottom-left: emph("Senior Software Engineer, Tech Lead Manager (AI Platform)"),
  bottom-right: emph(dates-helper(start-date: "May 2025", end-date: "Mar 2026")),
)
- Led a 5-engineer applied AI team and set the Niantic Studio AI roadmap with product, design, and ML partners.
- Launched 8th Wall Agent, a VS Code-compatible multimodal coding agent with a built-in MCP server for generating code and safely editing proprietary scene graphs\/prefabs; doubled addressable users and lifted daily active developers 20%.
- Launched 8th Wall Asset Lab for AI image and 3D generation, cutting project development time 50%, opening a new revenue stream, and making users 2.7x less likely to churn.
- Built automated evaluation and verification workflows for Qwen-2.5-Coder 7B\/32B fine-tuned on 25K+ prompt/code pairs with PyTorch and Hugging Face, reaching 55% Pass\@3, 15 points above prompt-engineered baselines.

#entry(
  left: emph("Senior Software Engineer (Backend Platform)"),
  right: emph(dates-helper(start-date: "Feb 2024", end-date: "May 2025")),
)
- Architected and launched #link("https://patents.google.com/patent/US20250377887A1/en?oq=20250377887")[patented] Niantic Studio Backend Services, a self-service platform for managed backend functions that automates infrastructure, secrets, builds, deployments, and versioning.
- Built production AI backend infrastructure: REST and streaming WebSocket\/SSE APIs, durable workflow orchestration, LLM evaluation pipelines, auth middleware, credit billing, and observability hooks.
- Built a RAG chatbot for Niantic Studio developer docs, implementing ingestion, indexing, vector search, and source-grounded guardrails for verifiable AI responses.

#entry(
  left: emph("Software Engineer (Backend Platform)"),
  right: emph(dates-helper(start-date: "Mar 2022", end-date: "Feb 2024")),
)
- Re-architected the serving path for user-built apps from 6 regional Postgres clusters to global edge serving, cutting AWS spend 20% and P95 latency 50% to 40 ms.
- Created a Kafka CDC platform for continuous replication from Postgres to DynamoDB and OpenSearch, powering low-latency edge serving, search indexing, and data processing workloads.
- Built a WebSocket platform and TypeScript client library for real-time shared state synchronization across users in 8th Wall's developer console.

#entry(
  top-left: strong("8th Wall"),
  top-right: "Palo Alto, CA",
  bottom-left: emph("Software Engineer II (Full-Stack)"),
  bottom-right: emph(dates-helper(start-date: "Jul 2021", end-date: "Mar 2022")),
)
- Engineered search and discovery infrastructure for 8thwall.com content surfaces, including search APIs, indexing pipelines, ranking algorithms, and OpenSearch tuning.
- Built an at-request-time image transformation service on Lambda\@Edge, CloudFront, and S3, caching optimized media at the edge and reducing frontend complexity.

#entry(
  left: emph("Software Engineer (Full-Stack)"),
  right: emph(dates-helper(start-date: "Jun 2020", end-date: "Jul 2021")),
)
- Built a Chrome DevTools-like console in 8th Wall's Cloud Editor with live build status, linked stack traces, and searchable command history for faster debugging.
- Shipped creator-facing profile, project, and code-sharing systems that expanded public discovery and user-generated content across 8th Wall.

== Skills
- Languages: JavaScript/TypeScript, Python, Rust, SQL
- Infrastructure: AWS, Bedrock, Sagemaker, Postgres, Kafka, DynamoDB, Elasticsearch, Lambda, Step Functions
- Frameworks: React, Node.js, Effect, Next.js, TanStack Start, LangChain/LangGraph, PyTorch
- Tools: Docker, Bazel, AWS CDK, GitHub Actions, OpenTelemetry

== Education

#entry(
  top-left: strong("California State University, East Bay"),
  top-right: "Hayward, CA",
  bottom-left: emph("Bachelor of Science, Computer Science"),
  bottom-right: emph(dates-helper(start-date: "2018", end-date: "2020")),
)
- GPA: 3.898\/4.0 (Dean's List)
