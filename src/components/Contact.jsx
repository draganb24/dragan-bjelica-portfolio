import headshot from '../assets/images/headshot.png';

// TODO: if a Calendly (or similar) link is added, swap BOOKING_URL below —
// everything else stays the same.
const BOOKING_URL = 'mailto:draganbjelica12@gmail.com?subject=15-min%20call';

export default function Contact() {
  return (
    <section id="contact" className="contact">
      <div className="wrap contact__inner">
        <img src={headshot} alt="Dragan Bjelica" className="contact__photo" />
        <div>
        <p className="eyebrow">contact</p>
        <h2 className="contact__headline">
          If you're scaling a backend system and want a second set of eyes on
          architecture — let's talk.
        </h2>
        <div className="contact__actions">
          <a href={BOOKING_URL} className="contact__cta">Book a 15-min call</a>
          <a href="mailto:draganbjelica12@gmail.com" className="contact__secondary">
            draganbjelica12@gmail.com
          </a>
          <a
            href="https://github.com/draganb24"
            target="_blank"
            rel="noopener noreferrer"
            className="contact__secondary"
          >
            github.com/draganb24
          </a>
        </div>
        </div>
      </div>
    </section>
  );
}
