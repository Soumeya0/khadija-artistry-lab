export default function SectionHeader({ eyebrow, title, subtitle, light = false }) {
  return (
    <header className={`section-header${light ? ' section-header--light' : ''}`}>
      {eyebrow && <p className="eyebrow">{eyebrow}</p>}
      <h2>{title}</h2>
      {subtitle && <p className="section-header__sub">{subtitle}</p>}
    </header>
  );
}
