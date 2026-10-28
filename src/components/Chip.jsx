export default function Chip({ active = false, disabled = false, children, ...rest }) {
  return (
    <button
      type="button"
      className={`chip${active ? ' chip--active' : ''}`}
      disabled={disabled}
      aria-pressed={active}
      {...rest}
    >
      {children}
    </button>
  );
}
