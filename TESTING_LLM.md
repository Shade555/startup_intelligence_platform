# AI LLM Testing & Deployment Guide

This guide details how to spin up the 100% free, self-hosted LLM backend for testing and displaying the application's AI capabilities, specifically the Floating Chat Advisor and the RAG pipelines.

## 🧠 The Model
We use `Meta-Llama-3-8B-Instruct`. It provides incredible logic and reasoning capabilities that rival paid models, making it the perfect engine to process our financial RAG data.

## 🚀 How to Run the Backend (Google Colab + Ngrok)

To ensure a smooth presentation without spending money on GPU infrastructure, we host the Llama-3 model on a free Google Colab T4 GPU and tunnel the API to our Next.js frontend using Ngrok.

### 1. Get an Ngrok Token
1. Go to [ngrok.com](https://ngrok.com/) and sign up for a free account.
2. In your dashboard, navigate to **Your Authtoken** and copy it.

### 2. Spin up the Google Colab Server
1. Open a new [Google Colab notebook](https://colab.research.google.com/).
2. Go to **Runtime > Change runtime type** and select **T4 GPU**.
3. Create a single cell and paste the following code:

```python
# 1. Install missing system dependencies (zstd) and pyngrok
!apt-get update && apt-get install -y zstd
!pip install pyngrok -q

# 2. Install Ollama (the engine that runs the model)
!curl -fsSL https://ollama.com/install.sh | sh

import subprocess
import time
import os
from pyngrok import ngrok

# 3. Start the Ollama server in the background
print("Starting Ollama server...")
# IMPORTANT: This allows your Next.js localhost to talk to Ollama without CORS blocking it
os.environ["OLLAMA_ORIGINS"] = "*" 
subprocess.Popen(["ollama", "serve"])
time.sleep(5) # Give the server a few seconds to boot up

# 4. Pull the Meta Llama 3 8B model (this will take a minute to download)
print("Downloading Llama-3 model...")
!ollama pull llama3

# 5. Expose the server using Ngrok
# REPLACE THIS WITH YOUR TOKEN:
ngrok.set_auth_token("YOUR_NGROK_AUTH_TOKEN") 

# Ollama's API runs on port 11434 by default
# We use host_header="localhost" to bypass Ollama's security blocks
public_url = ngrok.connect(11434, host_header="localhost").public_url

print("\n" + "="*60)
print(f"✅ YOUR PUBLIC API URL IS: {public_url}")
print("="*60 + "\n")

# Keep the notebook cell running indefinitely
import threading
threading.Event().wait()
```

### 3. Connect the Frontend
1. Run the Colab cell. It will print a URL like: `https://abcd-1234.ngrok-free.app`.
2. Keep the Colab browser tab open.
3. Open `frontend/app/components/ui/FloatingChat.tsx`.
4. Update the `fetch()` URL inside the `sendMessage` function to point to your new Ngrok URL:
   ```javascript
   const response = await fetch("https://abcd-1234.ngrok-free.app/api/chat", { ... })
   ```
5. Click the floating button in the dashboard and start chatting!

---

## 🛠 For the Backend Team (RAG Implementation)
A standard Python backend has been created at `./backend/`. Once the RAG pipeline is fully developed in Python, we can route the frontend chat requests through the Python `FastAPI` server (which will query the vector DB and then call the Colab LLM) instead of having the frontend call the Colab LLM directly.

---

## 🛑 Troubleshooting & Hurdles (How we fixed them)
During setup, we encountered several strict security and environment errors. Here is how they were resolved:

1. **`zstd` Extraction Error:** The Google Colab base image didn't have the `zstd` compression library, causing the Ollama installation to fail. 
   * **Fix:** Added a command to install `zstd` via `apt-get` before running the Ollama script.
2. **Browser CORS Error (`Failed to fetch`):** Next.js running on `localhost:3000` was blocked from fetching the Ngrok URL directly. 
   * **Fix:** Set the `OLLAMA_ORIGINS="*"` environment variable in Python to instruct Ollama to accept all cross-origin requests.
3. **Ngrok 403 Warning Screen:** Ngrok's free tier intercepted our API POST requests and returned an HTML warning screen, crashing the JSON parser.
   * **Fix:** We built a Next.js API proxy (`/api/chat/route.ts`) to route traffic server-to-server. We also injected a `User-Agent: curl` header to trick Ngrok into bypassing the warning screen.
4. **Ollama Host Header Security (403 Forbidden):** Ollama's internal security system rejected requests because the incoming `Host` header was the Ngrok URL instead of `localhost` (DNS rebinding protection).
   * **Fix:** Added `host_header="localhost"` to the `ngrok.connect()` function, forcing Ngrok to spoof the header so Ollama thinks it's a local request.
5. **Slow UI / Endless Loading:** Generating 200 words of text felt extremely slow because the UI waited for the entire paragraph to finish before displaying it.
   * **Fix:** Implemented an NDJSON stream reader in `FloatingChat.tsx` and configured the Next.js API route to pipe the stream. The text now types out instantly word-by-word.
