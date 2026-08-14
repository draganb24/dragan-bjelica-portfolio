# Dragan Bjelica — Portfolio

Backend developer portfolio. Static React app (Vite), no server, no database.
See the "Why this site is built with Vite + React" note in the site footer
for the full reasoning.

## Structure

- `src/data/caseStudies.js` — all case study content lives here. Edit text,
  add repo links, and set `image` once screenshots are in `src/assets/images/`.
- `src/components/` — Hero, WorkSection, CaseStudyCard, Contact, Footer, Nav,
  and the SchemaDiagram signature visual.
- `src/pages/Home.jsx` — assembles Hero + WorkSection + Contact.
- `src/pages/CaseStudyDetail.jsx` — dynamic route at `/work/:slug`, pulls
  from `caseStudies.js`.

## Run locally

```bash
npm install
npm run dev
```

Opens at `http://localhost:5173`.

## Before deploying — things still marked TODO in the code

1. **Screenshots** — `caseStudies.js` has `image: null` for both full case
   studies. Drop images into `src/assets/images/`, import them at the top
   of `caseStudies.js`, and set the `image` field.
2. **Repo links** — every `repoUrl` currently points at
   `https://github.com/draganb24` as a placeholder. Replace with the actual
   repo URL per project (or leave pointing at the profile if a repo is
   private).
3. **Booking link** — `src/components/Contact.jsx` has `BOOKING_URL` set to
   a `mailto:`. Swap in a Calendly (or similar) link if/when you have one.

## Deploy (GitHub → Vercel)

1. Push this project to a new GitHub repo:
   ```bash
   git init
   git add .
   git commit -m "Initial portfolio"
   git branch -M main
   git remote add origin <your-repo-url>
   git push -u origin main
   ```
2. Go to vercel.com, **Add New → Project**, import the GitHub repo. Vercel
   auto-detects Vite — no config needed. Click Deploy.
3. Every future `git push` to `main` auto-deploys. That's the whole pipeline.
4. If you have a custom domain already, add it under
   **Project → Settings → Domains** in Vercel and point your DNS per their
   instructions.
