import type { MiscTileSlug, Tile } from "../../domain/types";
import { cx } from "../../utils/classNames";
import MiscTileSvg from "../TileSvg/MiscTileSvg";
import TileSvg from "../TileSvg/TileSvg";
import styles from "./MeldPreview.module.scss";

export interface MeldPreviewProps {
  tiles?: { tile?: Tile; miscTileSlug?: MiscTileSlug; caption?: string }[];
}

const MeldPreview: React.FC<MeldPreviewProps> = ({ tiles }) => {
  if (!tiles) return <>No tiles</>;

  const isPair = tiles.length === 2;

  const tileElements = tiles.map(({ tile, miscTileSlug }, index) => {
    const key = `tile-${index}`;

    if (tile) return <TileSvg key={key} tile={tile} />;
    if (miscTileSlug) return <MiscTileSvg key={key} slug={miscTileSlug} />;
    return <MiscTileSvg key={key} slug={"error"} />;
  });

  return (
    <div className={cx(styles.tilePreview, isPair && styles.pairPreview)}>
      {tileElements.map((ele, index) => {
        const { caption } = tiles[index];
        if (!caption) return ele;

        return (
          <div key={`${caption}-${index}`}>
            {ele}
            <span
              style={{
                background: "#121212",
                padding: "12px 12px",
                borderRadius: "16px",
                marginTop: "24px",
                boxSizing: "border-box",
              }}
            >
              {caption}
            </span>
          </div>
        );
      })}
    </div>
  );
};

export default MeldPreview;
