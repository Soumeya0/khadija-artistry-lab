import { Link } from 'react-router-dom';
import Logo from './Logo.jsx';
import { SITE } from '../data/site.js';

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container footer__grid">
        <div>
          <Logo tone="light" />
          <p>{SITE.hours}</p>
          <p>{SITE.area} · Home visits</p>
          <p>Services in {SITE.languages.join(', ')}</p>
        </div>
        <div>
          <h4>Explore</h4>
          <Link to="/">Home</Link>
          <Link to="/booking">Booking</Link>
          <Link to="/reviews">Reviews</Link>
        </div>
        <div>
          <h4>Follow</h4>
          <a href={SITE.instagramUrl} target="_blank" rel="noreferrer">{SITE.instagram}</a>
        </div>
      </div>
      <p className="footer__legal container">© {new Date().getFullYear()} {SITE.name}. All rights reserved.</p>
    </footer>
  );
}
