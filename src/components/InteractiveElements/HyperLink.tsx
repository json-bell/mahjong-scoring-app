import { cx } from "../../utils/classNames";
import type { LinkProps } from "./Link";
import Link from "./Link";
import styles from "./Interactive.module.scss";

export interface HyperLinkProps extends LinkProps {}

const HyperLink: React.FC<HyperLinkProps> = ({
  className,
  children,
  ...linkProps
}) => {
  return (
    <Link {...linkProps} className={cx(styles.hyperLink, className)}>
      {children}
    </Link>
  );
};

export default HyperLink;
