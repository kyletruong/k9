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
  bottom-left: emph("Senior Software Engineer, Technical Lead Manager (AI)"),
  bottom-right: emph(dates-helper(start-date: "May 2025", end-date: "Present")),
)
- Technical lead and engineering manager for 8th Wall's AI team, growing the organization from 1 to 6 engineers across ML and full-stack and setting the AI roadmap for Niantic Studio.
- Launched 8th Wall Agent, a VS Code-compatible multimodal AI agent built with built-in MCP server that generates idiomatic 8th Wall code and edits proprietary scene graphs and prefabs, doubling the addressable user base and increasing daily active developers by 20%.
- Fine-tuned Qwen-2.5-Coder 7B and 32B on 25K+ prompt/code pairs with PyTorch and Hugging Face, improving code generation quality to 55% Pass\@3, 15 points above prompt-engineered baselines.
- Launched 8th Wall Asset Lab, AI tooling for text-to-image, image-to-image, and text-to-3D workflows in Niantic Studio, cutting project development time 50%, opening a new revenue stream, and making users 2.7x less likely to churn.

#entry(
  left: emph("Senior Software Engineer (Infrastructure and AI)"),
  right: emph(dates-helper(start-date: "Feb 2024", end-date: "May 2025")),
)
- Architected and launched Niantic Studio Backend Services, a patented client/server platform that deploys version-pinned backend functions into application-specific serverless environments, securing API keys and game logic while eliminating up to a week of separate infrastructure setup.
- Built AI platform services on AWS Bedrock and AppSync delivering streaming APIs, shared auth middleware, credit accounting, and realtime delivery for generative AI features.
- Built a generalized edge logging API on Lambda\@Edge, Kinesis, and Lambda that accepted JSON payloads, validated and serialized them into protobuf at runtime, and piped application telemetry into Niantic's data warehouse.

#entry(
  left: emph("Software Engineer (Infrastructure)"),
  right: emph(dates-helper(start-date: "Mar 2022", end-date: "Feb 2024")),
)
- Created a durable CDC platform on Postgres, DMS, Kinesis, Lambda, and Step Functions that became shared infrastructure across 8th Wall for marketing automation, email, abuse detection, and edge-serving workloads.
- Re-architected the platform's hottest app-serving path from 6 regional app servers and Postgres read replicas to a global Lambda\@Edge architecture with CDC-replicated DynamoDB data, cutting AWS spend 20% and reducing latency worldwide.
- Built a reusable authorized WebSocket platform with API Gateway, Lambda, DynamoDB, and SQS that pushed Postgres-driven state changes to the frontend in real time, enabling shared account and application state without polling.
- Introduced AWS CDK as infrastructure as code for the team, enabling service owners to define and ship their own stacks, reducing backend bottlenecks and accelerating infrastructure delivery.

#entry(
  top-left: strong("8th Wall"),
  top-right: "Palo Alto, CA",
  bottom-left: emph("Software Engineer II (Full Stack)"),
  bottom-right: emph(dates-helper(start-date: "Jul 2021", end-date: "Mar 2022")),
)
- Engineered search and discovery infrastructure powering all major content surfaces on 8thwall.com, including search APIs, indexing pipelines, ranking algorithms, and OpenSearch tuning.
- Owned billing systems integrating Stripe and AWS services for subscriptions, payments, and account lifecycle workflows.
- Built an at-request-time image transformation service on Lambda\@Edge, CloudFront, and S3 that improved asset performance and reduced frontend complexity.

#entry(
  left: emph("Software Engineer (Full Stack)"),
  right: emph(dates-helper(start-date: "Jun 2020", end-date: "Jul 2021")),
)
- Built a Chrome DevTools-like console in 8th Wall's Cloud Editor with live build status, expandable linked stack traces, and reversible command history search.
- Shipped creator-facing profile, project, and code-sharing features that expanded public discovery and user-generated content across the platform.

#entry(
  top-left: strong("Lawrence Livermore National Laboratory"),
  top-right: "Livermore, CA",
  bottom-left: emph("Software Engineer Intern (Full Stack)"),
  bottom-right: emph(dates-helper(start-date: "May 2019", end-date: "Aug 2019")),
)
- Built an internal web application for scientists to store and distribute classified information.
- Developed Flask and MongoDB APIs with bulk fetch and pagination to streamline file management workflows.

== Projects

#entry(
  left: [
    *k9 monorepo* (#link(normalize-url("github.com/kyletruong/k9"))[github.com/kyletruong/k9])
  ],
  right: emph(dates-helper(start-date: "Jul 2025", end-date: "Present")),
)
- Built a multi-tenant Cloudflare Sandbox service that provisions isolated per-user, per-repo environments and proxies AI coding agents against live GitHub repositories.
- Built an edge-cached Open Graph rendering pipeline that derives previews from the route tree and asynchronously populates the Cloudflare cache.
- Standardized monorepo developer workflow with Turbo watch pipelines, type-aware linting, and shared UI packages to keep multiple apps moving together.

== Patents

#entry(
  left: strong("Integrated client-side and server-side application development"),
  right: emph("Dec 2025 (Publication Date)"),
)
- Publication Number: #link("https://patents.google.com/patent/US20250377887A1/en?oq=20250377887")[US 20250377887 A1]
- Assignee: Niantic

== Education

#entry(
  top-left: strong("California State University, East Bay"),
  top-right: "Hayward, CA",
  bottom-left: emph("Bachelor of Science, Computer Science"),
  bottom-right: emph(dates-helper(start-date: "2018", end-date: "2020")),
)
- GPA: 3.898\/4.0 (Dean's List)

#entry(
  top-left: strong("Foothill College"),
  top-right: "Los Altos Hills, CA",
  bottom-left: emph("Transfer Coursework"),
  bottom-right: emph(dates-helper(start-date: "2017", end-date: "2020")),
)
