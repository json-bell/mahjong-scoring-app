import { useApiCheck } from "../../../hooks/api-status/useApiCheck";
import { cx } from "../../../utils/classNames";
import styles from "./ApiStatusPill.module.scss";
import LoadingSpinner from "../../LoadingSpinner/LoadingSpinner";
import useTimeSinceUpdate from "../../../hooks/useTimeSinceUpdate";
import TickIcon from "../../Icons/TickIcon";
import CrossIcon from "../../Icons/CrossIcon";

const ApiStatusPill: React.FC = () => {
  const { error, isReady, onReload } = useApiCheck();

  const { timeSinceUpdate, resetTimeSinceUpdate } = useTimeSinceUpdate(
    [
      { slug: "new", timeMs: 0 },
      { slug: "short", timeMs: 2000 },
      { slug: "long", timeMs: 5000 },
    ],
    [error, isReady]
  );

  const onRefresh = () => {
    onReload();
    resetTimeSinceUpdate();
  };

  const renderPieces = (): {
    buttonContents: React.ReactNode;
    info: React.ReactNode;
    infoClassName?: string;
  } => {
    if (error)
      return {
        buttonContents: <CrossIcon size={28} />,
        info: `${error} - Click here to try again`,
        infoClassName: cx(timeSinceUpdate === "long" && styles.fadeOut),
      };

    if (isReady)
      return {
        buttonContents: <TickIcon size={28} />,
        info:
          timeSinceUpdate !== "long"
            ? "Connected to the API successfully!"
            : null,
        infoClassName: cx(timeSinceUpdate !== "new" && styles.fadeOut),
      };

    return {
      buttonContents: <LoadingSpinner size={24} />,
      info: {
        new: null,
        short: "Connecting...",
        long: "Connecting... The Render API may take up to 3 mins to start...",
      }[timeSinceUpdate],
    };
  };

  const { buttonContents, info, infoClassName } = renderPieces();

  return (
    <button
      type="button"
      className={cx(
        styles.apiStatusPill,
        error && styles.error,
        isReady && styles.ready
      )}
      onClick={onRefresh}
    >
      {buttonContents}
      {info && <span className={cx(styles.info, infoClassName)}>{info}</span>}
    </button>
  );
};

export default ApiStatusPill;
