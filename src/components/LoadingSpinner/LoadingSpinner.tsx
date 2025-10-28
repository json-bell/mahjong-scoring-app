import styles from "./LoadingSpinner.module.scss";

interface LoadingSpinnerProps {
  color?: string;
  size?: 16 | 24 | 32 | 48 | 64;
}

const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({
  color = "inherit",
  size,
}) => {
  const dynamicStyle: React.CSSProperties = {
    color,
    ...(size ? { scale: size / 32 } : {}),
  };
  return <span style={dynamicStyle} className={styles.spinner} />;
};

export default LoadingSpinner;
