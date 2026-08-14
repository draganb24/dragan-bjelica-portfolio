// A small, real schema fragment — not decoration. This mirrors the actual
// table relationships from the reporting-platform case study, used as the
// hero's signature visual: showing the claim instead of just stating it.
export default function SchemaDiagram() {
  return (
    <svg
      viewBox="0 0 340 220"
      className="schema-diagram"
      role="img"
      aria-label="Simplified database schema: a report table connects to report_entries, which references workers and machines."
    >
      <g stroke="var(--line)" strokeWidth="1" fill="none">
        <path d="M 90 46 L 90 78" />
        <path d="M 60 118 L 40 150" />
        <path d="M 120 118 L 140 150" />
      </g>

      <g fontFamily="var(--font-mono)" fontSize="10.5">
        {/* report */}
        <rect x="34" y="14" width="112" height="32" rx="3" fill="var(--panel-raised)" stroke="var(--line)" />
        <text x="46" y="34" fill="var(--accent)">report</text>

        {/* report_entries */}
        <rect x="18" y="86" width="144" height="32" rx="3" fill="var(--panel-raised)" stroke="var(--accent-dim)" />
        <text x="30" y="106" fill="var(--text-dim)">report_entries</text>

        {/* workers */}
        <rect x="4" y="158" width="90" height="32" rx="3" fill="var(--panel)" stroke="var(--line)" />
        <text x="16" y="178" fill="var(--muted)">workers</text>

        {/* machines */}
        <rect x="108" y="158" width="98" height="32" rx="3" fill="var(--panel)" stroke="var(--line)" />
        <text x="120" y="178" fill="var(--muted)">machines</text>
      </g>
    </svg>
  );
}
