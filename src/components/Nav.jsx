import { Link } from 'react-router-dom';

export default function Nav() {
  return (
    <header className="nav">
      <div className="wrap nav__inner">
        <Link to="/" className="nav__name">Dragan Bjelica</Link>
        <nav className="nav__links">
          <a href="/#work">Work</a>
          <a href="/#contact">Contact</a>
        </nav>
      </div>
    </header>
  );
}
