import { useApiCheck } from "../../../hooks/api-status/useApiCheck";
import { cx } from "../../../utils/classNames";
import styles from "./ApiStatusPill.module.scss";
import LoadingSpinner from "../../UI/Loading/LoadingSpinner/LoadingSpinner";
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
    if (error)
      return (
        <>
          <span>Error - please refresh</span>
        </>
      );

    if (isReady) return "Connected :)";

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
        isReady && styles.isReady
      )}
      onClick={onRefresh}
    >
      {loadingEle}
    </button>
  );
};

export default ApiStatusPill;
