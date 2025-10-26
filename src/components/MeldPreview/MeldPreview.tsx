import type { MiscTileSlug, Tile } from "../../domain/types";
import MiscTileSvg from "../TileSvg/MiscTileSvg";
import TileSvg from "../TileSvg/TileSvg";
import styles from "./MeldPreview.module.scss";

export interface MeldPreviewProps {
  tiles?: { tile?: Tile; miscTileSlug?: MiscTileSlug }[];
}

const MeldPreview: React.FC<MeldPreviewProps> = ({ tiles }) => {
  if (!tiles) return <>No tiles to preview</>;

  const tileElements = tiles.map(({ tile, miscTileSlug }, index) => {
    const key = `tile-${index}`;

    if (tile) return <TileSvg key={key} tile={tile} />;
    if (miscTileSlug) return <MiscTileSvg key={key} slug={miscTileSlug} />;
    return <MiscTileSvg key={key} slug={"error"} />;
  });
  return <div className={styles.tilePreview}>{tileElements}</div>;
};

export default MeldPreview;
