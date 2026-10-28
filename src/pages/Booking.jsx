import { useMemo, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import Chip from '../components/Chip.jsx';
import Button from '../components/Button.jsx';
import { SERVICES, findService, priceLabel } from '../data/services.js';
import { existingBookings } from '../data/bookings.js';
import { monthGrid, slotsForDay, isWeekend, isPastDay, toKey, fmtTime } from '../lib/booking.js';

const MONTHS = ['January','February','March','April','May','June','July','August','September','October','November','December'];
const DOW = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];
const longDate = (d) => d.toLocaleDateString('en-CA', { weekday: 'long', month: 'long', day: 'numeric' });

export default function Booking() {
  const [params] = useSearchParams();
  const now = useMemo(() => new Date(), []);
  const [lookId, setLookId] = useState(findService(params.get('look')) ? params.get('look') : 'full');
  const [view, setView] = useState({ y: now.getFullYear(), m: now.getMonth() });
  const [date, setDate] = useState(null);
  const [slot, setSlot] = useState(null);
  const [form, setForm] = useState({ address: '', name: '', email: '' });
  const [sent, setSent] = useState(false);

  const look = findService(lookId);
  const weeks = monthGrid(view.y, view.m);
  const slots = date ? slotsForDay(date, look.minutes, existingBookings(date), now) : [];
  const set = (k) => (e) => setForm({ ...form, [k]: e.target.value });
  const ready = date && slot != null && form.address.trim() && form.name.trim() && /\S+@\S+\.\S+/.test(form.email);

  const shift = (n) => {
    const d = new Date(view.y, view.m + n, 1);
    setView({ y: d.getFullYear(), m: d.getMonth() });
  };
  const pickLook = (id) => { setLookId(id); setSlot(null); };
  const pickDate = (d) => { setDate(d); setSlot(null); };

  if (sent) {
    return (
      <section className="page-head">
        <div className="container center confirm">
          <p className="eyebrow">Request received</p>
          <h1>Thank you, {form.name.split(' ')[0]}!</h1>
          <p>
            Your request for <strong>{look.name}</strong> on <strong>{longDate(date)}</strong> at <strong>{fmtTime(slot)}</strong> was
            sent. This is a demo, so no email goes out yet. In the live version you’d get an instant yes or no.
          </p>
          <Button onClick={() => { setSent(false); setSlot(null); }}>Make another request</Button>
        </div>
      </section>
    );
  }

  return (
    <>
      <section className="page-head">
        <div className="container page-head__grid">
          <div>
            <p className="eyebrow">Book a look</p>
            <h1>Choose your time</h1>
            <p className="muted">Pick a look, choose a time and get an instant yes or no.</p>
          </div>
          <ol className="steps" aria-label="Progress">
            <li className={date ? 'done' : 'active'}>1 Look &amp; day</li>
            <li className={date && slot == null ? 'active' : slot != null ? 'done' : ''}>2 Time</li>
            <li className={slot != null ? 'active' : ''}>3 Details</li>
          </ol>
        </div>
      </section>

      <section className="booking">
        <div className="container booking__grid">
          <div className="booking__main">
            <p className="eyebrow">Your look</p>
            <div className="chips">
              {SERVICES.map((s) => (
                <Chip key={s.id} active={s.id === lookId} onClick={() => pickLook(s.id)}>{s.name.replace(' Glam', '')}</Chip>
              ))}
            </div>

            <div className="calendar" aria-label="Calendar">
              <div className="calendar__head">
                <button type="button" onClick={() => shift(-1)} aria-label="Previous month" disabled={view.y === now.getFullYear() && view.m <= now.getMonth()}>‹</button>
                <h2>{MONTHS[view.m]} {view.y}</h2>
                <button type="button" onClick={() => shift(1)} aria-label="Next month">›</button>
              </div>
              <div className="calendar__grid">
                {DOW.map((d, i) => <span key={i} className="calendar__dow">{d}</span>)}
                {weeks.flat().map((d, i) => {
                  if (!d) return <span key={i} />;
                  const open = isWeekend(d) && !isPastDay(d, now);
                  const selected = date && toKey(d) === toKey(date);
                  return (
                    <button
                      key={i}
                      type="button"
                      disabled={!open}
                      className={`day${open ? ' day--open' : ''}${selected ? ' day--selected' : ''}`}
                      onClick={() => pickDate(d)}
                      aria-label={longDate(d)}
                      aria-pressed={selected}
                    >
                      {d.getDate()}
                    </button>
                  );
                })}
              </div>
              <p className="legend"><span className="legend__dot" /> Available weekend days · Sat &amp; Sun, 10 AM – 6 PM</p>
            </div>

            <p className="eyebrow">{date ? longDate(date) : 'Pick a day to see times'}</p>
            <div className="chips">
              {slots.map((s) => (
                <Chip key={s.start} active={slot === s.start} disabled={!s.available} onClick={() => setSlot(s.start)}>{s.label}</Chip>
              ))}
            </div>
            {date && <p className="muted small">Greyed-out times are already booked, in the past, or too close to another appointment (travel time is kept free).</p>}
          </div>

          <aside className="summary">
            <h2>Your request</h2>
            <dl>
              <div><dt>Look</dt><dd>{look.name}</dd></div>
              <div><dt>Date</dt><dd>{date ? longDate(date) : '—'}</dd></div>
              <div><dt>Time</dt><dd>{slot != null ? fmtTime(slot) : '—'}</dd></div>
              <div><dt>Price</dt><dd>{priceLabel(look)}</dd></div>
            </dl>
            <form onSubmit={(e) => { e.preventDefault(); if (ready) setSent(true); }}>
              <label>Where should Khadija come?
                <input value={form.address} onChange={set('address')} placeholder="Street address, city" autoComplete="street-address" />
              </label>
              <label>Your details
                <input value={form.name} onChange={set('name')} placeholder="Full name" autoComplete="name" />
              </label>
              <label className="sr-only" htmlFor="email">Email</label>
              <input id="email" type="email" value={form.email} onChange={set('email')} placeholder="Email" autoComplete="email" />
              <Button type="submit" disabled={!ready}>Request this time</Button>
              <p className="muted small center">You’ll get an instant yes or no.</p>
            </form>
          </aside>
        </div>
      </section>

      <section className="next">
        <div className="container">
          <p className="eyebrow center">What happens next</p>
          <div className="next__grid">
            {[
              ['Instant answer', 'Your request is checked against Khadija’s calendar and you get a yes or no right away.'],
              ['Confirmation', 'A yes goes straight onto her calendar and into your inbox.'],
              ['Travel time', 'Travel to your address is added automatically so nobody is rushed.'],
            ].map(([t, d], i) => (
              <div key={t} className="next__card"><span className="next__num">{i + 1}</span><h3>{t}</h3><p>{d}</p></div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
