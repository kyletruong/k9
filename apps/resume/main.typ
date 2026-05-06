#import "./lib.typ": *

#set list(indent: 1em)

#show: resume.with(
  author: "Kyle Truong",
  email: "kyletruong@gmail.com",
  phone: "949-632-0319",
  accent-color: "#26428b",
  font: "New Computer Modern",
  paper: "us-letter",
  author-position: left,
  personal-info-position: left,
  github: "github.com/kyletruong",
  linkedin: "linkedin.com/in/kyletruong",
  personal-site: "k9.dev",
)

== Experience

#entry(
  top-left: strong("Niantic (8th Wall Acquisition)"),
  top-right: "Palo Alto, CA",
  bottom-left: emph("Senior Software Engineer, Technical Lead Manager (Applied AI)"),
  bottom-right: emph(dates-helper(start-date: "May 2025", end-date: "Mar 2026")),
)
- Built and led 8th Wall's applied AI team, directly managing 5 engineers across ML and full-stack while setting the AI roadmap for Niantic Studio.
- Launched 8th Wall Agent, a VS Code-compatible multimodal coding agent backed by a built-in MCP server for generating 8th Wall code and editing proprietary scene graphs and prefabs, doubling the addressable user base and increasing daily active developers by 20%.
- Launched 8th Wall Asset Lab, generative AI tooling for image and 3D creation in Niantic Studio, cutting project development time 50%, opening a new revenue stream, and making users 2.7x less likely to churn.
- Fine-tuned Qwen-2.5-Coder 7B and 32B on 25K+ prompt/code pairs using PyTorch and Hugging Face, achieving 55% Pass\@3, 15 points above prompt-engineered baselines.

#entry(
  left: emph("Senior Software Engineer (Infrastructure)"),
  right: emph(dates-helper(start-date: "Feb 2024", end-date: "May 2025")),
)
- Architected and launched Niantic Studio Backend Services, a #link("https://patents.google.com/patent/US20250377887A1/en?oq=20250377887")[patented] client/server platform that deploys version-pinned backend functions into per-app serverless environments, securing API keys and game logic while eliminating up to a week of separate infrastructure setup.
- Built AI infrastructure including streaming LLM APIs over WebSockets and SSE, durable workflow orchestration, LLM evaluation pipelines, auth middleware, and a credit-based billing system for monetizing AI usage.

#entry(
  left: emph("Software Engineer (Infrastructure)"),
  right: emph(dates-helper(start-date: "Mar 2022", end-date: "Feb 2024")),
)
- Re-architected the primary serving path for user-built apps from 6 regional Postgres-backed application clusters to a global edge serving architecture, cutting AWS spend by 20% and reducing P95 latency by 50% to 40 ms.
- Created a Kafka-based change data capture (CDC) platform for continuous replication from Postgres to DynamoDB and OpenSearch, powering edge serving and search indexing workloads.
- Built a WebSocket platform and companion client library for real-time shared state synchronization across users in 8th Wall's developer console.

#entry(
  top-left: strong("8th Wall"),
  top-right: "Palo Alto, CA",
  bottom-left: emph("Software Engineer II (Full-Stack)"),
  bottom-right: emph(dates-helper(start-date: "Jul 2021", end-date: "Mar 2022")),
)
- Engineered search and discovery infrastructure powering all major content surfaces on 8thwall.com, including search APIs, indexing pipelines, ranking algorithms, and OpenSearch tuning.
- Built an at-request-time image transformation service on Lambda\@Edge, CloudFront, and S3 that improved asset performance and reduced frontend complexity.

#entry(
  left: emph("Software Engineer (Full-Stack)"),
  right: emph(dates-helper(start-date: "Jun 2020", end-date: "Jul 2021")),
)
- Built a Chrome DevTools-like console in 8th Wall's Cloud Editor with live build status, expandable linked stack traces, and reversible command history search.
- Shipped creator-facing profile, project, and code-sharing features that expanded public discovery and user-generated content across the platform.

#entry(
  top-left: strong("Lawrence Livermore National Laboratory"),
  top-right: "Livermore, CA",
  bottom-left: emph("Software Engineer Intern (Full-Stack)"),
  bottom-right: emph(dates-helper(start-date: "May 2019", end-date: "Aug 2019")),
)
- Built an internal web application for scientists to store, manage, and distribute classified information.

== Education

#entry(
  top-left: strong("California State University, East Bay"),
  top-right: "Hayward, CA",
  bottom-left: emph("Bachelor of Science, Computer Science"),
  bottom-right: emph(dates-helper(start-date: "2018", end-date: "2020")),
)
- GPA: 3.898\/4.0 (Dean's List)
