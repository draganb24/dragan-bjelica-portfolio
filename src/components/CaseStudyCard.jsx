import { Link } from 'react-router-dom';

export default function CaseStudyCard({ caseStudy }) {
  return (
    <article className="case-card">
      <div className="case-card__media">
        {caseStudy.image ? (
          <img src={caseStudy.image} alt={`Screenshot from ${caseStudy.title}`} />
        ) : (
          <div className="case-card__media-placeholder field-label">screenshot pending</div>
        )}
      </div>
      <div className="case-card__body">
        <div className="case-card__stack">
          {caseStudy.stack.map((tech) => (
            <span key={tech} className="pill">{tech}</span>
          ))}
        </div>
        <h3 className="case-card__title">{caseStudy.title}</h3>
        <p className="case-card__result">{caseStudy.result}</p>
        <Link to={`/work/${caseStudy.slug}`} className="case-card__link">
          Read case study →
        </Link>
      </div>
    </article>
  );
}
