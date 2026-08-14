import { Routes, Route, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import Nav from './components/Nav';
import Footer from './components/Footer';
import Home from './pages/Home';
import CaseStudyDetail from './pages/CaseStudyDetail';

// Scrolls to top on route change, and to the right anchor when navigating
// back to "/#work" or "/#contact" from a case study page.
function ScrollManager() {
  const location = useLocation();

  useEffect(() => {
    if (location.hash) {
      const el = document.querySelector(location.hash);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
        return;
      }
    }
    window.scrollTo(0, 0);
  }, [location]);

  return null;
}

export default function App() {
  return (
    <>
      <ScrollManager />
      <Nav />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/work/:slug" element={<CaseStudyDetail />} />
        </Routes>
      </main>
      <Footer />
    </>
  );
}
