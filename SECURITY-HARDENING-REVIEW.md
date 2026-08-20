# Break-Your-Own-Site — Hardening Review (Week 7)

Portfolio: `D:\dragan-bjelica-portfolio` (Vite + React SPA, static, no server).
Review date: 2026-08-20.

## How it was broken
Real browser testing in headless Chromium against `npm run dev` (localhost:5173),
plus `curl` link checks, a production `dist` build, and a static-hosting deep-link
probe (python http.server on the built `dist`). Build + lint green (`npm run build`,
`npm run lint` → 0 errors).

## WHERE IT BREAKS — triaged list

### ✅ FIXED (fix-now)
| #  | Finding                                                                                                                                                                                                                                     | How it broke                                                                        | Evidence of fix                                                                                                                                                                                                                                                   |
|----|---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|-------------------------------------------------------------------------------------|-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| F1 | **Empty form submitted straight to the API.** `noValidate` + no client check → clicking "Send message" with all blanks fired a real fetch to Web3Forms.                                                                                     | Browser: empty submit produced no error and the request went out.                   | `Contact.jsx` now runs `validate()` in `handleSubmit`; empty fields show "Please enter your name." / "…email." / "Please write a short message." and the fetch is skipped. Verified: `requestSubmit()` on empty form → 3 inputs get error class, no network call. |
| F2 | **Garbage accepted.** `not-an-email` + emoji spam passed the same way.                                                                                                                                                                      | Browser: typed garbage, submitted, no block.                                        | Loose email-shape check (`EMAIL_RE`). Verified: `not-an-email` → "That email doesn't look right." and is blocked. (Kept loose on purpose — don't reject legit plus-addressing / new TLDs.)                                                                        |
| F3 | **Honeypot was decorative.** `botcheck` checkbox was rendered but never read, so bots that tick it still submit.                                                                                                                            | Code review: no `onChange`, no read in submit.                                      | `botcheck` is now bound to state and, if checked, the submit is silently dropped (no success message, no network call).                                                                                                                                           |
| F4 | **Double-submit while sending.** Button only disabled *after* `setStatus('sending')`; a fast second click (or Enter) before React commits could fire two fetches.                                                                           | Code review of handler.                                                             | `handleSubmit` returns early if `status === 'sending'`. Button also stays `disabled` during send.                                                                                                                                                                 |
| F5 | **Deep-link 404 on static hosts.** `/work/:slug` reloads fine on `vite dev` (SPA fallback) but a built `dist` served by a plain static host returns 404 for direct hits / refreshes / shared links.                                         | Probe: `python -m http.server` on `dist`, `GET /work/reporting-platform` → **404**. | Added `vercel.json` rewrite `{ "source": "/(.*)", "destination": "/index.html" }` so Vercel serves index.html for all routes. (Confirmed valid JSON.)                                                                                                             |
| F6 | **No social-share / SEO metadata.** Only `<title>` + description existed; no Open Graph, no Twitter card, no `og:image`, no `robots.txt`, no structured data. Sharing the link would show a bare/incorrect preview and crawlers got little. | Code review of `index.html`.                                                        | Added: OG tags, `twitter:card=summary_large_image`, canonical, theme-color, JSON-LD `Person` schema. Generated `public/social-card.png` (1200×630) as `og:image`/`twitter:image`. Added `public/robots.txt`.                                                      |
| F7 | **All pages shared one `<title>`.** A case-study page's browser tab still said "Dragan Bjelica — Backend Developer".                                                                                                                        | Browser: navigated to `/work/reporting-platform`, title unchanged.                  | New `useDocumentTitle` hook → case-study route now sets "Reporting Platform for Machine & Workforce Data · Dragan Bjelica — Backend Developer".                                                                                                                   |
| F8 | **Nav anchors reloaded the page.** "Work"/"Contact" were plain `<a href="/#work">`; clicked from a case-study subpage they caused a full reload instead of client-side scroll.                                                              | Code review + the in-app "Read case study" link also didn't client-route cleanly.   | `Nav.jsx` now uses React Router `<Link to="/#work">` / `"/#contact"`; existing `ScrollManager` handles hash scrolling without a reload.                                                                                                                           |

### 🟡 KNOWN LIMITATIONS (named, not hidden)
| # | Limitation | Why it stays | Mitigation |
|---|-----------|-------------|------------|
| K1 | **Contact form has no server-side validation/rate-limit.** Client checks are UX only; a crafted POST to the Web3Forms key still lands. | It's a free static site with no backend; Web3Forms (the chosen 3rd-party endpoint) provides its own spam filtering + honeypot + captcha. | Honeypot + Web3Forms spam protection in place. If volume grows, add a serverless function or Turnstile. |
| K2 | **Web3Forms key is in client JS.** Anyone can read the access key. | Inherent to client-only form services; the key is scoped to one inbox and rate-limited by the provider. | Acceptable for a portfolio; documented in code. Rotate via Web3Forms dashboard if abused. |
| K3 | **One case study (`research-publishing-dashboard`) has no screenshot** (`image: null`) — shows a deliverables list instead of a screenshot. | Images not provided yet (README TODO #1). | Renders a clean fallback list, not a broken image. Drop a PNG in `src/assets/images/` + set `image` to fix. |
| K4 | **Browser/device coverage tested only via headless Chromium.** No real mobile Safari/Old-Edge/iOS physical-device pass. | No device lab available this session. | CSS has responsive `@media` breakpoints (720px, 560px) + `prefers-reduced-motion`; layout uses fluid `max-width` + wrap. Recommend a manual phone pass before launch. |
| K5 | **Speed check not run against the live URL** (site isn't deployed yet). | No public URL yet (Vercel deploy is the launch step). | Ran a local proxy: built JS 79.4 kB gzip, CSS 2.6 kB gzip, images already optimized (headshot 58 kB, largest screenshot 124 kB). Should score well on Lighthouse once deployed; re-run the free check post-launch. |
| K6 | **`WEB3FORMS_ACCESS_KEY` placeholder guard** still references `'YOUR_WEB3FORMS_ACCESS_KEY'`. | Real key already present and working; guard is a sane fail-safe for forks. | Left as-is intentionally. |

## Findability & speed (assignment asks)
- **SEO/meta added:** title, description, canonical, OG + Twitter cards, `og:image`
  (`/social-card.png`), `robots.txt`, JSON-LD Person. ✔
- **Self-search:** cannot run until deployed + indexed (K5). After launch, search
  "Dragan Bjelica backend developer" and confirm the listing + preview render.
- **Free speed check:** run after deploy — e.g. Google PageSpeed Insights /
  web.dev/measure on the live URL. Local bundle is already small (≈82 kB gzip total).

## Files changed
- `index.html` — full SEO/meta + JSON-LD
- `public/social-card.png` (new) — 1200×630 share image
- `public/robots.txt` (new)
- `vercel.json` (new) — SPA rewrite (fixes F5)
- `src/components/Contact.jsx` — validation, email check, honeypot, double-submit guard (F1–F4)
- `src/index.css` — error state styles
- `src/hooks/useDocumentTitle.jsx` (new) — per-page titles (F7)
- `src/pages/CaseStudyDetail.jsx` — uses title hook
- `src/components/Nav.jsx` — client-side anchor links (F8)

## Hardening review gate
Show the mentor / structured peer:
1. The triage table above (fix-now vs known-limitation).
2. The browser evidence for F1–F4 (empty + garbage now blocked) and F5 (404 → fixed by vercel.json).
3. The SEO additions (view source on `/` shows OG/Twitter/JSON-LD).
This checkpoint must pass to proceed to launch.
