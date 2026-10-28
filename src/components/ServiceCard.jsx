import { Link } from 'react-router-dom';
import Photo from './Photo.jsx';
import { priceLabel, durationLabel } from '../data/services.js';

export default function ServiceCard({ service }) {
  return (
    <Link to={`/booking?look=${service.id}`} className="service-card">
      <Photo src={service.images[0]} alt={service.name} label="Photo" ratio="4 / 3.4" />
      <div className="service-card__body">
        <h3>{service.name}</h3>
        <p>{service.blurb}</p>
        <p className="service-card__price">{priceLabel(service)} · {durationLabel(service)}</p>
      </div>
    </Link>
  );
}
