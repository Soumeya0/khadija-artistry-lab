import Button from '../components/Button.jsx';
import Chip from '../components/Chip.jsx';
import Photo from '../components/Photo.jsx';
import SectionHeader from '../components/SectionHeader.jsx';
import ServiceCard from '../components/ServiceCard.jsx';
import ReviewCard from '../components/ReviewCard.jsx';
import { SERVICES, priceLabel, durationLabel } from '../data/services.js';
import { REVIEWS } from '../data/reviews.js';
import { SITE } from '../data/site.js';

const FEATURES = [
  ['Hygiene-first', 'Clean, prepared kit for every client'],
  ['I come to you', 'Home visits across Ottawa – Orléans'],
  ['Three languages', 'English, French and Somali'],
  ['Instant answer', 'Request a time, get a yes or no'],
];

const STEPS = [
  ['Choose your look', 'Pick a look and see its price and duration.'],
  ['Pick a time', 'Only times that fit the schedule are shown.'],
  ['Get an instant answer', 'Confirmed times land on the calendar and in your inbox.'],
];

export default function Home() {
  return (
    <>
      <section className="hero">
        <div className="container hero__grid">
          <div className="hero__copy">
            <p className="eyebrow eyebrow--light">{SITE.area} makeup artist</p>
            <h1>
              <span className="hero__script">Walk in as you.</span>
              <span className="hero__caps">Leave feeling your best.</span>
            </h1>
            <p className="hero__lead">
              Bridal, event and everyday glam, brought to you. Pick your look, choose a time and get an instant answer.
            </p>
            <div className="hero__cta">
              <Button to="/booking" kind="light">Book a look</Button>
              <Button to="#services" kind="outlineLight" onClick={(e) => { e.preventDefault(); document.getElementById('services')?.scrollIntoView({ behavior: 'smooth' }); }}>See services</Button>
            </div>
          </div>
          <div className="hero__photo">
            <Photo src={SITE.heroImage} alt="Makeup look by Khadija’s Artistry Lab" label="Hero photo" ratio="5 / 6" />
            <div className="hero__badge">
              <strong>EN · FR · SOM</strong>
              <span>Sat &amp; Sun</span>
              <span>10 AM – 6 PM</span>
            </div>
          </div>
        </div>
      </section>

      <section className="features">
        <div className="container features__grid">
          {FEATURES.map(([t, d]) => (
            <div key={t} className="feature">
              <span className="feature__dot" aria-hidden="true" />
              <div><strong>{t}</strong><p>{d}</p></div>
            </div>
          ))}
        </div>
      </section>

      <section className="about" id="about">
        <div className="container about__grid">
          <div className="about__photo"><Photo label="About photo" ratio="1 / 1" /></div>
          <div>
            <p className="eyebrow">About me</p>
            <h2>Hi, I’m Khadija</h2>
            <p className="script-line">Walk in as you, leave as your best.</p>
            <p>
              I’m a STEM-minded makeup artist who loves bold, colourful looks and is just as happy with soft and natural.
              For me, makeup is self-expression, confidence and joy. I come to you, with a clean, prepared kit, so you can
              relax and enjoy getting ready.
            </p>
            <div className="about__row">
              <div className="chips">
                {SITE.languages.map((l, i) => <Chip key={l} active={i === 0}>{l}</Chip>)}
              </div>
              <Button to="/booking">Book with me</Button>
            </div>
          </div>
        </div>
      </section>

      <section className="services" id="services">
        <div className="container">
          <SectionHeader
            eyebrow="What I do"
            title="Makeup for every occasion"
            subtitle="Every look includes skin prep. Prices and durations are placeholders."
          />
          <div className="services__grid">
            {SERVICES.map((s) => <ServiceCard key={s.id} service={s} />)}
          </div>
        </div>
      </section>

      <section className="showcase">
        <div className="container"><SectionHeader eyebrow="Showcase" title="See each look up close" /></div>
        {SERVICES.map((s, i) => (
          <div key={s.id} className={`showcase__row${i % 2 ? ' showcase__row--alt' : ''}`} id={`look-${s.id}`}>
            <div className="container showcase__inner">
              <div className="showcase__text">
                <h3 className="label-box">{s.name}</h3>
                <p>{s.blurb}</p>
                <p className="showcase__price">{priceLabel(s)} · {durationLabel(s)}</p>
                <p className="muted">Includes skin prep and a hygiene-first kit.</p>
                <Button to={`/booking?look=${s.id}`}>Book this look</Button>
              </div>
              <div className="showcase__tiles">
                <Photo src={s.images[0]} label="Photo" className="t1" ratio="auto" />
                <Photo src={s.images[1]} label="Photo" className="t2" ratio="auto" />
                <Photo src={s.images[2]} label="Photo" className="t3" ratio="auto" />
                <Photo src={s.images[3]} label="Photo" className="t4" ratio="auto" />
              </div>
            </div>
          </div>
        ))}
      </section>

      <section className="how">
        <div className="container">
          <SectionHeader eyebrow="How booking works" title="Three steps to your look" light />
          <ol className="how__grid">
            {STEPS.map(([t, d], i) => (
              <li key={t}><span className="how__num">{i + 1}</span><h3>{t}</h3><p>{d}</p></li>
            ))}
          </ol>
        </div>
      </section>

      <section className="reviews-preview">
        <div className="container">
          <SectionHeader eyebrow="Kind words" title="What clients say" />
          <div className="reviews__grid">
            {REVIEWS.slice(0, 3).map((r) => <ReviewCard key={r.id} review={r} />)}
          </div>
          <div className="center"><Button to="/reviews" kind="outline">Read all reviews</Button></div>
        </div>
      </section>

      <section className="cta">
        <div className="container center">
          <h2>Ready to look &amp; feel your best?</h2>
          <p>Choose a look and request a time. You’ll get an instant answer.</p>
          <Button to="/booking">Book a look</Button>
        </div>
      </section>
    </>
  );
}
