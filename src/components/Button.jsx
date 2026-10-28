import { Link } from 'react-router-dom';

// kind: primary | light | outline | outlineLight
export default function Button({ to, kind = 'primary', children, ...rest }) {
  const cls = `btn btn--${kind}`;
  return to ? (
    <Link to={to} className={cls} {...rest}>{children}</Link>
  ) : (
    <button className={cls} {...rest}>{children}</button>
  );
}
