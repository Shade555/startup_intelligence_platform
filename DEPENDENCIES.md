# Project Dependencies & Libraries

This document outlines all the major packages, libraries, and frameworks currently installed in the Startup Intelligence Platform.

## 🎨 Frontend Stack (Next.js)

The frontend is built on **Next.js 16 (App Router)** and **React 19**, utilizing Turbopack for ultra-fast compiling.

### Core UI & Styling
* **[Tailwind CSS v4](https://tailwindcss.com/):** The primary utility-first CSS framework used for styling the entire application (including the glassmorphic design system).
* **[Framer Motion](https://www.framer.com/motion/) (`framer-motion`):** A production-ready motion library for React. We use this extensively for the smooth transitions on the dashboard, the 3-column Agent view, and the pop-up animations of the Floating Chat Window.
* **[Lucide React](https://lucide.dev/) (`lucide-react`):** A beautiful, consistent icon library used for all the UI icons (like the AI advisor button).
* **[clsx] & [tailwind-merge]:** Utility libraries used to conditionally join Tailwind CSS classes together without style conflicts.

### Database & Authentication
* **[Supabase](https://supabase.com/) (`@supabase/supabase-js` & `@supabase/ssr`):** Our backend-as-a-service. Used for user authentication (Sign In / Sign Up), managing sessions via Server-Side Rendering (SSR) cookies, and storing the users' Startup profile data (like LinkedIn URLs).

### AI & Text Rendering
* **[React Markdown](https://github.com/remarkjs/react-markdown) (`react-markdown`):** *(Newly added!)* Used inside the `FloatingChat.tsx` window to parse and render the raw Markdown text coming from the Llama-3 AI into beautiful, styled HTML elements (bold text, bullet points, code blocks).

---

## 🧠 AI Backend & Inference (Google Colab)

* **[Ollama](https://ollama.com/):** The local LLM engine we install on the Google Colab T4 GPU to run `Meta-Llama-3-8B-Instruct` efficiently.
* **[PyNgrok](https://pyngrok.readthedocs.io/en/latest/) (`pyngrok`):** A Python wrapper for Ngrok that we use inside the Colab notebook to securely tunnel the local Colab server to the public internet, allowing our Next.js proxy route to fetch responses.

---

## 🛠 Python RAG Backend (In Progress)

The `backend/` directory is currently scaffolded out for the RAG team. As they build out the RAG pipeline, they will likely be adding dependencies such as `FastAPI`, `Uvicorn`, `LangChain` or `LlamaIndex`, and `ChromaDB` / `Pinecone` to the `requirements.txt` file.
