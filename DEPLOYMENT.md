Deployment guide
================

This repo contains a Next.js frontend (`frontend/`) and a Node/Express backend with Prisma (`backend/`).

Recommended quick path:

- Frontend: deploy to Vercel (connect the GitHub repo)
- Backend: deploy the Docker image (built via GitHub Actions) to Render/Cloud Run/Heroku. You can also use Render's GitHub integration.

Actions provided:

- `.github/workflows/backend-build-and-push.yml` — builds the backend Docker image and pushes to `ghcr.io/${{ github.repository_owner }}/portfolio-backend:latest` on push to `main`.

Required repository secrets:

- `CR_PAT` — Personal access token with `write:packages` scope to publish to GitHub Container Registry, if Actions default permissions are not enough.
- For Vercel: `VERCEL_TOKEN` (if you want to use Vercel CLI or Actions).
- For Render/other hosts: their API key or connect the repo directly.

Quick steps
-----------

1. Frontend (Vercel):

   - Go to https://vercel.com/new and import the GitHub repository.
   - Set Environment Variables (if any), e.g. `NEXT_PUBLIC_API_URL` -> `https://your-backend.example.com`.

2. Backend (using GitHub Container Registry + Render):

   - In GitHub, set secret `CR_PAT` (if necessary).
   - The workflow pushes `ghcr.io/<owner>/portfolio-backend:latest` on `main`.
   - Create a new service in Render (or your chosen host) and use the image from GitHub Container Registry or connect the repo and deploy from source.
   - Set environment variables on the host: `DATABASE_URL`, `JWT_SECRET`, `FRONTEND_URL`.

3. Optional: run seed data locally or on the server:

```bash
cd backend
npm run prisma:seed
```

If you want, I can also:

- Create a Vercel Action to auto-deploy the frontend from GitHub Actions.
- Configure a Render service using API (requires `RENDER_API_KEY`).
