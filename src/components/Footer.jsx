export default function Footer() {
  return (
    <footer className="footer">
      <div className="wrap">
        <details className="stack-note">
          <summary>Why this site is built with Vite + React, not Next.js or plain HTML</summary>
          <div className="stack-note__body">
            <p>
              Free hosting, a short content map (hero → work → contact, no about),
              and nothing dynamic — no forms, no database, no live demo. That ruled
              out Next.js: its routing, build complexity, and version upgrades exist
              to support dynamic features this site doesn't use.
            </p>
            <p>
              Plain HTML/CSS/JS was the simplest option, and where I actually started
              to get something live fast. But the work itself needs to show through
              the repo as much as through the text — a plain HTML file means
              copy-pasted markup instead of a reusable <code>CaseStudyCard</code>{' '}
              component and a shared case-study layout.
            </p>
            <p>
              Static React on Vite sits at the right complexity: reusable components
              without a framework I'm not using, no server or database to maintain,
              and Vercel auto-deploys from GitHub on push. The repo structure is
              itself part of the proof that I write maintainable code.
            </p>
          </div>
        </details>
        <p className="footer__copy field-label">built by dragan bjelica</p>
      </div>
    </footer>
  );
}
