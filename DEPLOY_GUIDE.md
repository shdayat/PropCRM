Deployment & Security Guide
===========================

1) Run the proxy locally (development)

From project root:

```powershell
cd server
# create server/.env with GEMINI_API_KEY and optional CLIENT_ORIGIN
npm install
$env:GEMINI_API_KEY="<your_key>"
node index.js
```

Then open `http://localhost:3000/health` to verify.

2) Recommended production deploy options

- Vercel / Netlify: deploy `server/` as a serverless function (Vercel) or use their serverless API routes.
- Heroku / Render: deploy `server/` as a small Node service and set `GEMINI_API_KEY` in the host environment.

Important environment variables:
- `GEMINI_API_KEY` (server) — keep secret
- `CLIENT_ORIGIN` — set to your frontend origin to restrict CORS

3) Frontend

The frontend will call `/api/gemini`. When deploying frontend + backend to different origins, configure a reverse proxy or set `CLIENT_ORIGIN` on the proxy to your frontend origin.

4) Rotate leaked keys

If an API key was committed, rotate it immediately in the provider console (Gemini/Google Cloud, Firebase). Then remove the leaked file from git history (see next section).

5) Removing secrets from Git history (manual, recommended to run carefully)

Recommended approach: use BFG or `git filter-repo`. Example using BFG (install BFG separately):

```bash
# remove the file from all history
bfg --delete-files .env.local
# rewrite and clean
git reflog expire --expire=now --all
git gc --prune=now --aggressive
# force-push rewritten history (only when safe; coordinate with team)
git push --force
```

Read BFG docs and coordinate with your team before rewriting public history.
