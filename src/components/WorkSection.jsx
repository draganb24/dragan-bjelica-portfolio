import { caseStudies, otherWork } from '../data/caseStudies';
import CaseStudyCard from './CaseStudyCard';

export default function WorkSection() {
  return (
    <section id="work" className="work">
      <div className="wrap">
        <p className="eyebrow">selected_work</p>
        <div className="work__grid">
          {caseStudies.map((cs) => (
            <CaseStudyCard key={cs.slug} caseStudy={cs} />
          ))}
        </div>

        <div className="other-work">
          <p className="field-label other-work__label">other_work</p>
          <ul className="other-work__list">
            {otherWork.map((item) => (
              <li key={item.slug} className="other-work__item">
                <div className="other-work__item-head">
                  <h4>{item.title}</h4>
                  {item.repoUrl ? (
                    <a href={item.repoUrl} target="_blank" rel="noopener noreferrer" className="other-work__repo">
                      repo →
                    </a>
                  ) : (
                    <span className="other-work__repo other-work__repo--nda">code under NDA</span>
                  )}
                </div>
                <p>{item.summary}</p>
                <div className="case-card__stack">
                  {item.stack.map((tech) => (
                    <span key={tech} className="pill pill--muted">{tech}</span>
                  ))}
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
