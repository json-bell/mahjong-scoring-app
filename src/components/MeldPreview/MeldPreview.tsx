import { cx } from "../../utils/classNames";
import styles from "./MeldPreview.module.scss";
import GeneralisedTile, { type TilePreview } from "./GeneralisedTile";

export interface MeldPreviewProps {
  previews?: TilePreview[];
}

const MeldPreview: React.FC<MeldPreviewProps> = ({ previews }) => {
  if (!previews) return <>No tiles</>;

  const isPair = previews.length === 2;

  return (
    <div className={cx(styles.tilePreview, isPair && styles.pairPreview)}>
      {previews.map((preview, index) => {
        const key = `tile-${index}`;

        return <GeneralisedTile preview={preview} key={key} />;
      })}
    </div>
  );
};

export default MeldPreview;
