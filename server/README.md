PropCRM Gemini Proxy
=====================

This tiny Express app proxies requests to Google's Gemini generative API so the
API key is kept on a trusted backend instead of bundled into the frontend.

Quick start:

1. Copy `server/.env.example` to `server/.env` and set `GEMINI_API_KEY`.
2. From `server/` run:

```bash
npm install
npm start
```

3. Keep the proxy running (e.g. on the same host or serverless function) and
   point the frontend to it (frontend already calls `/api/gemini`).
  
Optional: protect your proxy

This proxy supports two simple protection methods (set in environment):

- `PROXY_API_KEY` — set a shared API key and the client must send `x-api-key` header.
- `PROXY_API_USER` and `PROXY_API_PASS` — set username/password and the client can use HTTP Basic auth.

Example client header (Basic):

```
Authorization: Basic <base64(user:pass)>
```

Or with API key:

```
x-api-key: your_proxy_api_key_here
```
