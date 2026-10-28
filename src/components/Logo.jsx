// Uses the real logo image (public/images). `tone`: 'plum' for light backgrounds, 'light' for dark ones.
export default function Logo({ tone = 'plum' }) {
  return (
    <img
      className={`logo logo--${tone}`}
      src={`/images/logo-${tone}.png`}
      alt="Khadija's Artistry Lab — Makeup, Art, Beauty"
    />
  );
}
