import SchemaDiagram from './SchemaDiagram';

export default function Hero() {
  return (
    <section className="hero">
      <div className="wrap hero__inner">
        <div className="hero__copy">
          <p className="eyebrow">role: backend_developer</p>
          <h1 className="hero__headline">
            Java &amp; Spring Boot backend developer who turns messy data into
            structured, searchable systems.
          </h1>
          <p className="hero__intro">
            I design backend systems that grow with the business, not against it — starting
            before the first line of code: turning ambiguous requirements, like a folder of
            spreadsheet reports, into a well-structured database, then building the roles,
            content handling, and REST APIs on top with an eye for atomicity and maintainable code.
          </p>
          <p className="hero__proof">
            <span className="field-label">proof:</span> data modeling · REST APIs in Spring Boot ·
            replacing spreadsheets &amp; paper with structured systems
          </p>
          <a href="#work" className="hero__cta">See how →</a>
        </div>
        <div className="hero__visual" aria-hidden="true">
          <SchemaDiagram />
          <p className="hero__visual-caption field-label">
            report_entries → workers, machines
          </p>
        </div>
      </div>
    </section>
  );
}
