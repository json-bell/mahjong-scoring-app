import { Link as ReactRouterLink, type To } from "react-router-dom";
import styles from "./Interactive.module.scss"; // removes hyperlink styles
import { cx } from "../../utils/classNames";

export interface LinkProps {
  to: To;
  children: React.ReactNode;
  _target?: string;
  className?: string;
  style?: React.CSSProperties;
}

const Link: React.FC<LinkProps> = ({
  to,
  children,
  className,
  style,
  target,
}) => {
  return (
    <ReactRouterLink
      to={to}
      className={cx(styles.link, className)}
      style={style}
    >
      {children}
    </ReactRouterLink>
  );
};

export default Link;
