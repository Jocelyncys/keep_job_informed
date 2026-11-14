import { CandidateProfile, JobApplication, InterviewQuestion } from '../types';

export const initialProfile: CandidateProfile = {
  fullName: "Alex Chen",
  email: "alex.chen.dev@example.com",
  phone: "+60 12-345 6789",
  headline: "Full-Stack Software Engineer | React, TypeScript & Node.js",
  summary: "Results-driven Software Engineer with 3.5+ years of experience building scalable web applications, microservices, and modern UI architectures. Passionate about performant frontend engineering and clean API design.",
  skills: [
    "React", "TypeScript", "Next.js", "Node.js", "PostgreSQL", 
    "Tailwind CSS", "RESTful APIs", "GraphQL", "Docker", "Git", "Jest"
  ],
  experiences: [
    {
      id: "exp-1",
      role: "Software Engineer",
      company: "Innovate Tech Labs",
      duration: "2023 - Present",
      bullets: [
        "Architected and deployed responsive customer dashboard using React, TypeScript, and Tailwind CSS, increasing user engagement by 32%.",
        "Refactored legacy REST APIs into modular Node.js/Express services, reducing p95 query latency by 45%.",
        "Collaborated with product designers to implement an accessible component library adopted across 4 internal squads."
      ]
    },
    {
      id: "exp-2",
      role: "Junior Frontend Developer",
      company: "Nexus Digital Agency",
      duration: "2021 - 2023",
      bullets: [
        "Built 12+ client e-commerce and marketing web portals with optimized Core Web Vitals (achieved 95+ Lighthouse scores).",
        "Integrated Stripe payment gateway and automated webhook handlers, facilitating over $1.5M in seamless transactions."
      ]
    }
  ],
  education: [
    {
      school: "University of Malaya / Monash University",
      degree: "B.S. in Computer Science",
      year: "2017 - 2021"
    }
  ]
};

export const initialApplications: JobApplication[] = [
  {
    id: "app-1",
    company: "Grab",
    role: "Senior Frontend Engineer (Merchant Experience)",
    location: "Kuala Lumpur, Malaysia (Hybrid)",
    source: "LinkedIn",
    appliedDate: "2026-11-06T10:00:00Z", // 8 days ago - triggers "Stale / No Response"
    lastUpdated: "2026-11-06T10:00:00Z",
    stage: "applied",
    salary: "RM 9,500 - RM 13,000 / mo",
    jobUrl: "https://www.linkedin.com/jobs/view/grab-frontend-engineer",
    contactPerson: {
      name: "Sarah Lim",
      title: "Senior Talent Acquisition Specialist",
      email: "sarah.lim@grab.careers"
    },
    notes: "Applied via LinkedIn Easy Apply. Haven't received automated confirmation email yet.",
    jobDescription: `About the Role:
We are looking for a Senior Frontend Engineer to build intuitive merchant operations workflows.
Key Responsibilities:
- Design and build robust web interfaces using React, TypeScript, and micro-frontend architecture.
- Optimize web app bundle size and runtime performance for high-traffic merchant dashboards.
- Partner closely with Product Managers and UX Researchers across Southeast Asia.

Requirements:
- 3+ years experience with React, TypeScript, modern state management (Zustand/Redux).
- Strong understanding of browser rendering pipelines, caching, and CI/CD.
- Experience with large-scale distributed web applications.`,
    matchScore: 82,
    tailoredCvVersion: "Grab_Frontend_Tailored_v1.pdf"
  },
  {
    id: "app-2",
    company: "Stripe",
    role: "Full Stack Engineer (Payments Infrastructure)",
    location: "Singapore / Remote Southeast Asia",
    source: "Company Portal",
    appliedDate: "2026-11-02T14:30:00Z",
    lastUpdated: "2026-11-12T09:00:00Z",
    stage: "interviewing",
    salary: "$110,000 - $135,000 USD / yr",
    jobUrl: "https://stripe.com/jobs/full-stack-engineer-sea",
    contactPerson: {
      name: "David Tan",
      title: "Engineering Manager",
      email: "dtan@stripe.com"
    },
    notes: "Passed recruiter phone screen. Round 2 Technical Deep Dive & System Architecture scheduled for Tuesday 2:00 PM.",
    jobDescription: `Stripe is looking for a Full Stack Engineer to help scale our payment settlement systems.
What you'll do:
- Design APIs and developer dashboards used by millions of global merchants.
- Work with Ruby, Go, TypeScript, and React.
- Ensure 99.999% uptime for transaction processing pipelines.
- Practice rigorous testing, code reviews, and architectural RFCs.`,
    matchScore: 89,
    tailoredCvVersion: "Stripe_Payments_Tailored_v2.pdf"
  },
  {
    id: "app-3",
    company: "Shopee / SeaMoney",
    role: "Web Application Engineer",
    location: "Kuala Lumpur (Mid Valley)",
    source: "JobStreet",
    appliedDate: "2026-11-09T08:15:00Z",
    lastUpdated: "2026-11-13T11:00:00Z",
    stage: "action_required",
    salary: "RM 8,000 - RM 11,500 / mo",
    jobUrl: "https://www.jobstreet.com.my/job/shopee-web-engineer",
    actionRequiredNotice: "Action Required: Complete 60-min HackerRank assessment by Sunday 11:59 PM.",
    contactPerson: {
      name: "Rachel Wong",
      title: "Campus & Tech Recruiter",
      email: "rachel.wong@sea.com"
    },
    notes: "Received HackerRank test link via email. Need to practice algorithms & React hooks.",
    jobDescription: `Shopee is seeking an ambitious Web Engineer.
Responsibilities:
- Build high-concurrency e-commerce campaign pages during 11.11 and 12.12 mega sales.
- Collaborate with backend engineers to consume REST and gRPC endpoints.
- Enhance security against cross-site scripting (XSS) and CSRF attacks.`,
    matchScore: 78
  },
  {
    id: "app-4",
    company: "Dyson Technology",
    role: "IoT Software Frontend Specialist",
    location: "Johor Bahru / Singapore",
    source: "Indeed",
    appliedDate: "2026-11-11T16:00:00Z",
    lastUpdated: "2026-11-12T10:00:00Z",
    stage: "screening",
    salary: "RM 8,500 - RM 12,000 / mo",
    jobUrl: "https://my.indeed.com/viewjob?jk=dyson-iot-frontend",
    notes: "Application confirmed received by Dyson Workday ATS. Currently under HR Review.",
    jobDescription: `Develop real-time device monitoring portals and telemetry data visualizers for Dyson connected appliances.
Requirements: React, WebSocket, Chart.js / D3.js, TypeScript.`,
    matchScore: 75
  },
  {
    id: "app-5",
    company: "Canva",
    role: "Product Frontend Engineer",
    location: "Remote (APAC)",
    source: "LinkedIn",
    appliedDate: "2026-10-25T11:00:00Z",
    lastUpdated: "2026-11-13T15:00:00Z",
    stage: "offered",
    salary: "$120,000 AUD / yr + Equity",
    jobUrl: "https://www.linkedin.com/jobs/view/canva-frontend",
    contactPerson: {
      name: "Liam O'Connor",
      title: "Lead Technical Recruiter",
      email: "liam.o@canva.com"
    },
    notes: "Offer letter received! Reviewing healthcare, remote allowance, and stock options.",
    jobDescription: `Work on Canva's core graphic design editor engine and real-time collaboration canvas.
Proficiency with Canvas API, WebGL, React, and TypeScript.`,
    matchScore: 92
  }
];

export const sampleInterviewQuestions: Record<string, InterviewQuestion[]> = {
  "app-2": [ // Stripe Interview questions
    {
      id: "q-1",
      category: "Technical",
      question: "How do you ensure zero data loss and idempotency when handling webhook payment events in a distributed system?",
      whyItMatters: "Stripe handles critical financial transactions where network retries and duplicate events are common.",
      suggestedAnswer: "Explain the use of unique idempotency keys stored in an atomic datastore (like Redis or PostgreSQL with unique constraints). When a webhook arrives, check if the event ID has already been processed before executing business logic. Always return a 200 OK once recorded to avoid unnecessary retries."
    },
    {
      id: "q-2",
      category: "Behavioral (STAR)",
      question: "Tell me about a time when a critical bug occurred in production. How did you diagnose, resolve, and prevent it from recurring?",
      whyItMatters: "Evaluates your poise under pressure, post-mortem rigor, and customer-first mindset.",
      starTip: {
        situation: "Cite your experience at Innovate Tech Labs during a high-traffic release.",
        task: "Identify API latency spike affecting checkout.",
        action: "Used APM tracing to isolate an unindexed database query, rolled out a fast index patch, and communicated proactively with customer support.",
        result: "Reduced query times by 45% and established query performance alerts in CI."
      },
      suggestedAnswer: "Structure your story clearly using STAR. Emphasize calm communication, fast mitigation first (rollback or hotfix), followed by root cause analysis and automated unit/integration tests to prevent recurrence."
    },
    {
      id: "q-3",
      category: "Resume Deep Dive",
      question: "Your resume highlights reducing p95 query latency by 45%. What profiling tools did you use and how did you decide where the bottleneck was?",
      whyItMatters: "Interviewers check if you actually drove the impact listed on your resume or just participated.",
      suggestedAnswer: "Discuss using node-clinic or Chrome DevTools memory/CPU profiler alongside PostgreSQL EXPLAIN ANALYZE. Highlight that the culprit was N+1 queries in the ORM, which you solved by batching with DataLoader and adding composite indexing."
    },
    {
      id: "q-4",
      category: "Culture & Alignment",
      question: "Stripe values high velocity combined with extreme attention to detail and craftsmanship. How do you balance shipping fast vs. code perfection?",
      whyItMatters: "Tests alignment with company operating principles.",
      suggestedAnswer: "I believe speed and quality aren't enemies when you have solid automated test foundations and feature flags. I ship minimum lovable increments behind flags, gathering telemetry early while ensuring core API contracts and security are never compromised."
    },
    {
      id: "q-5",
      category: "Questions to Ask Interviewer",
      question: "What is the biggest engineering bottleneck your team is currently facing as transaction volume grows across APAC?",
      whyItMatters: "Demonstrates strategic curiosity and positions you as a peer problem solver.",
      suggestedAnswer: "Ask this towards the end. Follow up with: 'How are decisions made between re-architecting legacy services vs. building modular micro-frontends?'"
    }
  ],
  "default": [
    {
      id: "dq-1",
      category: "Behavioral (STAR)",
      question: "Tell me about a time you had a strong disagreement with a Product Manager or Engineer on technical direction. How did you resolve it?",
      whyItMatters: "Assesses collaboration, emotional intelligence, and alignment with business goals.",
      starTip: {
        situation: "A disagreement on adopting a complex state library vs simpler solution.",
        task: "Reach consensus without stalling product delivery deadlines.",
        action: "Built a fast prototype comparison matrix focusing on bundle weight and developer onboarding time.",
        result: "Aligned the team on data rather than opinions, shipping the sprint on schedule."
      },
      suggestedAnswer: "Keep it constructive. Focus on depersonalizing the conflict, bringing objective data or user metrics, and agreeing on what best serves the user."
    },
    {
      id: "dq-2",
      category: "Technical",
      question: "Can you explain how React's virtual DOM reconciliation works, and how you prevent unnecessary re-renders in large lists?",
      whyItMatters: "Foundational frontend mastery test.",
      suggestedAnswer: "Mention React Fiber's diffing algorithm, stable keys for list items, memoization techniques (useMemo, useCallback, React.memo), and windowing/virtualization libraries (e.g. TanStack Virtual) for 1000+ item lists."
    },
    {
      id: "dq-3",
      category: "Questions to Ask Interviewer",
      question: "How does the engineering team celebrate wins, and how does leadership support engineers who want to drive cross-functional initiatives?",
      whyItMatters: "Helps you assess if the company culture is supportive and growth-oriented.",
      suggestedAnswer: "Use this to evaluate manager support, psychological safety, and upward mobility."
    }
  ]
};
