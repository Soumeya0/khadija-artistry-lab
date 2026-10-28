import { useState } from 'react';
import Chip from '../components/Chip.jsx';
import Button from '../components/Button.jsx';
import ReviewCard from '../components/ReviewCard.jsx';
import { REVIEWS } from '../data/reviews.js';
import { SERVICES } from '../data/services.js';

export default function Reviews() {
  const [filter, setFilter] = useState('all');
  const [rating, setRating] = useState(0);
  const [text, setText] = useState('');
  const [done, setDone] = useState(false);
  const shown = REVIEWS.filter((r) => filter === 'all' || r.look === filter);

  return (
    <>
      <section className="reviews-hero">
        <div className="container center">
          <p className="eyebrow eyebrow--light">Reviews</p>
          <h1 className="script-title">Kind words</h1>
          <p>Reviews come from clients with a completed booking.</p>
          <span className="rating-pill">★ 0.0 average · 0 reviews (placeholder)</span>
        </div>
      </section>

      <section className="reviews-list">
        <div className="container">
          <div className="chips">
            <Chip active={filter === 'all'} onClick={() => setFilter('all')}>All</Chip>
            {SERVICES.map((s) => (
              <Chip key={s.id} active={filter === s.id} onClick={() => setFilter(s.id)}>{s.name.replace(' Glam', '')}</Chip>
            ))}
          </div>
          <div className="reviews__grid">
            {shown.map((r) => <ReviewCard key={r.id} review={r} />)}
          </div>
          {shown.length === 0 && <p className="muted center">No reviews for this look yet.</p>}
        </div>
      </section>

      <section className="leave">
        <div className="container leave__grid">
          <div>
            <p className="eyebrow">Leave a review</p>
            <h2>Tell us about your look</h2>
            <p className="muted">Use the link in your confirmation email. Reviews appear after Khadija approves them.</p>
          </div>
          {done ? (
            <div className="form-card center">
              <h3>Thank you!</h3>
              <p>Your review was sent and will appear once approved. (Demo: nothing is stored yet.)</p>
            </div>
          ) : (
            <form className="form-card" onSubmit={(e) => { e.preventDefault(); if (rating && text.trim()) setDone(true); }}>
              <fieldset className="rate">
                <legend>Your rating</legend>
                {[1, 2, 3, 4, 5].map((n) => (
                  <button key={n} type="button" onClick={() => setRating(n)} aria-label={`${n} stars`} aria-pressed={rating === n}>
                    <svg width="30" height="30" viewBox="0 0 24 24" aria-hidden="true">
                      <path d="M12 2.5l2.9 6.1 6.6.8-4.9 4.6 1.3 6.6L12 17.2 6.1 20.6l1.3-6.6L2.5 9.4l6.6-.8z" fill={n <= rating ? 'var(--magenta)' : 'none'} stroke="var(--magenta)" strokeWidth="1.6" strokeLinejoin="round" />
                    </svg>
                  </button>
                ))}
              </fieldset>
              <label>Your review
                <textarea rows="5" value={text} onChange={(e) => setText(e.target.value)} placeholder="Tell us about your experience" />
              </label>
              <Button type="submit" disabled={!rating || !text.trim()}>Submit review</Button>
            </form>
          )}
        </div>
      </section>

      <section className="cta">
        <div className="container center">
          <h2>Ready to look &amp; feel your best?</h2>
          <p>Choose a look and request a time.</p>
          <Button to="/booking">Book a look</Button>
        </div>
      </section>
    </>
  );
}
