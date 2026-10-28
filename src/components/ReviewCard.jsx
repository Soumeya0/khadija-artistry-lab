import Stars from './Stars.jsx';
import { findService } from '../data/services.js';

export default function ReviewCard({ review }) {
  const look = findService(review.look)?.name;
  return (
    <article className="review-card">
      <Stars value={review.rating} />
      <p className="review-card__text">{review.text}</p>
      <footer>
        <span className="review-card__avatar" aria-hidden="true" />
        <span>
          <strong>{review.name}</strong>
          {look && <small>{look}</small>}
        </span>
      </footer>
    </article>
  );
}
