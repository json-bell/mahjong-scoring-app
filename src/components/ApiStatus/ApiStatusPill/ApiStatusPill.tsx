import { useApiCheck } from "../../../hooks/api-status/useApiCheck";
import { cx } from "../../../utils/classNames";
import styles from "./ApiStatusPill.module.scss";
import LoadingSpinner from "../../LoadingSpinner/LoadingSpinner";
import { useEffect, useState } from "react";

const ApiStatusPill: React.FC = () => {
  const { error, isReady, onReload } = useApiCheck();

  const [hasStatusLastedLong, setHasStatusLastedLong] = useState(false);

  const onRefresh = () => {
    setHasStatusLastedLong(false);
    onReload();
  };

  useEffect(() => {
    setHasStatusLastedLong(false);
    const timeoutId = setTimeout(() => {
      setHasStatusLastedLong(true);
    }, 5000);
    return () => {
      clearTimeout(timeoutId);
    };
  }, [error, isReady]);

  const loadingEle: React.ReactNode = (() => {
    if (error) return <span>{error}</span>;

    if (isReady) return <span>API Connected :)</span>;

    return (
      <>
        <span>Connecting...</span>
        <LoadingSpinner size={16} />
        {hasStatusLastedLong && (
          <span className={styles.info}>
            The Render API may take up to 3 mins to start...
          </span>
        )}
      </>
    );
  })();

  return (
    <button
      className={cx(
        styles.apiStatusPill,
        error && styles.error,
        isReady && styles.ready
      )}
      onClick={onRefresh}
    >
      {loadingEle}
    </button>
  );
};

export default ApiStatusPill;
