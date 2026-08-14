import SchemaDiagram from './SchemaDiagram';

export default function Hero() {
  return (
    <section className="hero">
      <div className="wrap hero__inner">
        <div className="hero__copy">
          <p className="eyebrow">role: backend_developer</p>
          <h1 className="hero__headline">
            I design backend systems that grow with the business, not against it.
          </h1>
          <p className="hero__intro">
            I'm a backend developer working mainly in Java and Spring Boot. My work starts
            before the first line of code — turning ambiguous requirements, like a folder of
            spreadsheet reports, into a well-structured database, then building the roles,
            content handling, and APIs on top with an eye for atomicity and maintainable code.
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
