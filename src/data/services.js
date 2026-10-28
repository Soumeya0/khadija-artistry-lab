// Placeholder prices and durations — replace with the real ones.
// Bridal has no photos yet (empty `images`): add image URLs (e.g. '/images/bridal-1.jpg') and the
// placeholders turn into photos automatically.
export const SERVICES = [
  { id: 'bridal',  name: 'Bridal Glam',  blurb: 'Long-wear, camera-ready makeup for your wedding day.',     priceFrom: null, minutes: 120, images: [] },
  { id: 'full',    name: 'Full Glam',    blurb: 'Defined eyes, full coverage and lashes for special events.', priceFrom: null, minutes: 90,  images: [] },
  { id: 'soft',    name: 'Soft Glam',    blurb: 'Polished and glowy with a softly blended eye.',              priceFrom: null, minutes: 75,  images: [] },
  { id: 'natural', name: 'Natural Glam', blurb: 'Your skin, enhanced. Fresh and effortless.',                priceFrom: null, minutes: 60,  images: [] },
  { id: 'runway',  name: 'Runway Glam',  blurb: 'Bold, editorial looks for stage and camera.',                priceFrom: null, minutes: 90,  images: [] },
];

export const priceLabel = (s) => (s.priceFrom ? `From $${s.priceFrom}` : 'From $XX');
export const durationLabel = (s) => `${s.minutes} min`;
export const findService = (id) => SERVICES.find((s) => s.id === id);
