// Shows the image if `src` is given, otherwise a branded placeholder.
export default function Photo({ src, alt = '', label = 'Replace with photo', className = '', ratio = '4 / 5' }) {
  if (src) return <img className={`photo ${className}`} src={src} alt={alt} style={{ aspectRatio: ratio }} loading="lazy" />;
  return (
    <div className={`photo photo--placeholder ${className}`} style={{ aspectRatio: ratio }} role="img" aria-label={alt || label}>
      <svg viewBox="0 0 100 100" aria-hidden="true">
        <circle cx="50" cy="38" r="15" />
        <ellipse cx="50" cy="100" rx="32" ry="30" />
      </svg>
      <span>{label}</span>
    </div>
  );
}
