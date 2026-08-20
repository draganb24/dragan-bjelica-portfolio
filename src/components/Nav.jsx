import { Link } from 'react-router-dom';

export default function Nav() {
  return (
    <header className="nav">
      <div className="wrap nav__inner">
        <Link to="/" className="nav__name">Dragan Bjelica</Link>
        <nav className="nav__links">
          <Link to="/#work">Work</Link>
          <Link to="/#contact">Contact</Link>
        </nav>
      </div>
    </header>
  );
}
