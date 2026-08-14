import { Link, useParams } from 'react-router-dom';
import { caseStudies } from '../data/caseStudies';

export default function CaseStudyDetail() {
  const { slug } = useParams();
  const caseStudy = caseStudies.find((cs) => cs.slug === slug);

  if (!caseStudy) {
    return (
      <div className="wrap detail">
        <p className="eyebrow">not_found</p>
        <h1>Case study not found</h1>
        <Link to="/" className="detail__back">← Back home</Link>
      </div>
    );
  }

  return (
    <article className="detail">
      <div className="wrap">
        <Link to="/#work" className="detail__back">← Back to work</Link>

        <div className="case-card__stack detail__stack">
          {caseStudy.stack.map((tech) => (
            <span key={tech} className="pill">{tech}</span>
          ))}
        </div>

        <h1 className="detail__title">{caseStudy.title}</h1>
        <p className="detail__result">{caseStudy.result}</p>

        {caseStudy.images && caseStudy.images.length > 0 && (
          <div className="detail__gallery">
            {caseStudy.images.map((img, i) => (
              <figure key={i} className="detail__gallery-item">
                <div className="detail__media">
                  <img src={img.src} alt={img.caption} />
                </div>
                <figcaption className="field-label">{img.caption}</figcaption>
              </figure>
            ))}
          </div>
        )}

        <div className="detail__sections">
          {caseStudy.sections.map((section) => (
            <section key={section.label} className="detail__section">
              <p className="field-label">{section.label}</p>
              <h2>{section.heading}</h2>
              {section.body.split('\n\n').map((para, i) => (
                <p key={i}>{para}</p>
              ))}
            </section>
          ))}
        </div>

        {caseStudy.repoUrl && (
          <div className="detail__repo-links">
            <a
              href={caseStudy.repoUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="detail__repo-link"
            >
              {caseStudy.frontendRepoUrl ? 'Backend repo →' : 'View repository →'}
            </a>
            {caseStudy.frontendRepoUrl && (
              <a
                href={caseStudy.frontendRepoUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="detail__repo-link"
              >
                Frontend repo →
              </a>
            )}
          </div>
        )}

        <div className="detail__cta">
          <p>Want to talk through how I'd approach this for your system?</p>
          <Link to="/#contact" className="hero__cta">Let's talk →</Link>
        </div>
      </div>
    </article>
  );
}
