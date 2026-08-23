# 📁 Project Folder Structure

> **🤖 Agent Instruction:** 
> If you are an AI agent reading this file in the future, and you create new top-level directories, major configuration files, or significantly restructure the frontend/backend architecture, **you MUST update this file** to accurately reflect the new project structure. Do not remove existing entries unless the files/folders were actually deleted.

```text
startup_intelligence_platform/
├── backend/                  # Python/FastAPI Server (RAG & LLM)
│   ├── app/
│   │   ├── api/              # API Endpoints
│   │   ├── core/             # Config & Security
│   │   ├── models/           # Pydantic schemas
│   │   ├── services/         # AI & RAG logic
│   │   └── main.py           # Server entry point
│   └── requirements.txt      # Python dependencies
└── frontend/                 # Next.js Application
    ├── app/
    │   ├── api/
    │   │   └── chat/         # Next.js Proxy Route to Colab LLM
    │   ├── (routing)/
    │   │   ├── auth/
    │   │   │   ├── signin/
    │   │   │   └── signup/
    │   │   └── onboarding/
    │   └── dashboard/
    │       └── page.tsx              # Protected dashboard
    ├── components/
    │   ├── auth/
    │   │   ├── Auth.jsx              # Auth component (signin/signup toggle)
    │   │   └── Auth.css              # Auth styling
    │   ├── dashboard/
    │   │   └── Dashboard.jsx         # Dashboard component
    │   ├── ui/
    │   │   └── FloatingChat.tsx      # AI Advisor floating window
    │   └── Navbar.jsx                # Navigation component
    ├── lib/
    │   └── supabase/
    │       ├── client.ts             # Browser client
    │       └── server.ts             # Server client
    ├── layout.tsx                    # Root layout
    ├── page.tsx                      # Home page
    ├── globals.css                   # Global styles
    └── Home.css                      # Home page styles
    
    public/
    ├── bg.mp4                        # Background video
    └── favicon.ico
    
    Root Files
    ├── .env.local                    # Environment variables
    ├── next.config.ts                # Next.js config
    ├── tsconfig.json                 # TypeScript config
    ├── tailwind.config.js            # Tailwind config
    ├── postcss.config.mjs            # PostCSS config
    └── eslint.config.mjs             # ESLint config

Root Markdown Files:
├── DEPENDENCIES.md           # List of all packages and libraries used
├── TESTING_LLM.md            # Guide for spinning up the Colab Llama-3 model
└── FOLDER_STRUCTURE.md       # (This file) Project structure manifest
```
