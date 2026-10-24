# AI twin proxy

Cloudflare Worker that lets `hire.html` talk to Gemma 4 (`gemma-4-26b-a4b-it`) on the Gemini API without exposing the API key. Frank's profile (the system prompt) lives in `worker.js`; edit it there when experience changes.

## Deploy

1. Create a Gemini API key at https://aistudio.google.com/apikey
2. From this folder:
   ```sh
   npx wrangler login
   npx wrangler secret put GEMINI_API_KEY   # paste the key when prompted
   npx wrangler deploy
   ```
3. Copy the printed `https://frank-ai-twin.<subdomain>.workers.dev` URL into `AI_ENDPOINT` in `hire.html`.

Only origins in `ALLOWED_ORIGINS` can call the worker. If the worker is unreachable or errors, the page falls back to the pre-written replies.
