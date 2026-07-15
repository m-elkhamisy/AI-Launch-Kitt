# AI Launch Kit Frontend 

The React client for the V1 AI Launch Kit workflow. It uses the backend as the
source of truth for projects, wizard catalogs, uploads, mockups, builds, and
Vercel deployments.

## Local setup

1. Start the backend and its worker as described in the backend README.
2. Copy `.env.example` to `.env.local` and adjust `VITE_API_BASE_URL` if needed.
3. Install dependencies with `npm install`.
4. Start Vite with `npm run dev`.

Local backend testing may still use `LAUNCHKIT_TESTING_USER_ID`. Restricted AWS
staging uses the backend-enforced fixed email/code mode and an expiring bearer
session. This gate is not the production identity design. A project ID and the
current wizard step are saved in browser storage so a refresh resumes the durable
server-side project.

## Quality checks

Run `npm test`, `npm run typecheck`, `npm run build`, and `npm audit` before
shipping. The production API URL must be supplied at build time through
`VITE_API_BASE_URL`.

AWS Amplify uses `amplify.yml` to install from the lockfile, run all frontend
checks, and publish `dist`. Set `VITE_API_BASE_URL` to the Dokploy API HTTPS
origin in Amplify before building the staging branch.

Provider configuration and recovery behavior are deliberate: missing v0,
OpenRouter, or Vercel credentials produce a safe error with a retry action;
the UI never invents progress or a successful deployment.
