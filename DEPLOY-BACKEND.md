# Go Live: Frontend + Backend

Your **frontend is already live** on Vercel. Follow these steps to deploy the **backend** and connect them.

## Step 1: Create a free PostgreSQL database (Neon)

1. Go to [https://neon.tech](https://neon.tech) and sign up (free).
2. Create a new project, e.g. `portfolio-db`.
3. Copy the **connection string** (looks like `postgresql://user:pass@host/db?sslmode=require`).

## Step 2: Deploy backend on Render

1. Go to [https://dashboard.render.com](https://dashboard.render.com) and sign up (free).
2. Click **New +** → **Blueprint**.
3. Connect your GitHub repo: `abeer921/portfolio-website`.
4. Render will read `render.yaml` from the repo.
5. When prompted for **DATABASE_URL**, paste your Neon connection string.
6. Click **Apply** and wait for the deploy (~5–10 min).
7. Copy your backend URL, e.g. `https://portfolio-backend-xxxx.onrender.com`.

### First deploy only

`SEED_DATABASE=true` is set in `render.yaml` so the first deploy seeds admin data.

After the first successful deploy, go to Render → your service → **Environment** and set:

```
SEED_DATABASE=false
```

Otherwise every restart would wipe and reseed the database.

### Admin login (after seed)

- **URL:** `https://your-vercel-site.vercel.app/admin/login`
- **Email:** `abeernisar11@gmail.com`
- **Password:** `Abeer@UX2026`

Change this password after first login.

## Step 3: Connect frontend to backend (Vercel)

1. Open [Vercel Dashboard](https://vercel.com/dashboard) → your `uiuxbyabeer` project.
2. Go to **Settings** → **Environment Variables**.
3. Add:

| Name | Value |
|------|--------|
| `NEXT_PUBLIC_API_URL` | `https://portfolio-backend-xxxx.onrender.com/api` |

Use your actual Render URL and include `/api` at the end.

4. Go to **Deployments** → click **...** on the latest → **Redeploy**.

## Step 4: Verify

1. Backend health: `https://your-backend.onrender.com/health` → should return `{"status":"ok",...}`
2. CMS API: `https://your-backend.onrender.com/api/cms` → should return JSON
3. Frontend: open your Vercel site — content should load from the database
4. Admin: `/admin/login` — log in and edit content

## What works after both are live

| Feature | Status |
|---------|--------|
| Public pages | ✅ |
| CMS content from database | ✅ |
| Admin panel | ✅ |
| Contact form → database | ✅ |
| Image uploads in admin | ⚠️ Ephemeral on Render free (resets on redeploy) |

For persistent uploads later, use Cloudinary or Vercel Blob.

## Troubleshooting

**CORS errors:** Ensure `FRONTEND_URL` in Render matches your exact Vercel URL (no trailing slash).

**Cold starts:** Render free tier sleeps after ~15 min idle. First request may take 30–60 seconds.

**Database connection failed:** Check Neon connection string includes `?sslmode=require`.

**Still seeing fallback content:** Hard refresh and confirm `NEXT_PUBLIC_API_URL` ends with `/api` and Vercel was redeployed after adding it.
