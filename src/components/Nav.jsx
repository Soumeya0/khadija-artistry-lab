import { useState } from 'react';
import { NavLink, Link } from 'react-router-dom';
import Logo from './Logo.jsx';
import Button from './Button.jsx';

const LINKS = [
  { to: '/', label: 'Home', end: true },
  { to: '/booking', label: 'Booking' },
  { to: '/reviews', label: 'Reviews' },
];

export default function Nav() {
  const [open, setOpen] = useState(false);
  return (
    <header className="nav">
      <div className="nav__inner">
        <Link to="/" className="nav__logo" onClick={() => setOpen(false)}><Logo /></Link>
        <button className="nav__toggle" aria-expanded={open} aria-label="Menu" onClick={() => setOpen(!open)}>
          <span /><span /><span />
        </button>
        <nav className={`nav__links${open ? ' is-open' : ''}`}>
          {LINKS.map((l) => (
            <NavLink key={l.to} to={l.to} end={l.end} onClick={() => setOpen(false)}>{l.label}</NavLink>
          ))}
          <Button to="/booking" onClick={() => setOpen(false)}>Book a look</Button>
        </nav>
      </div>
    </header>
  );
}
