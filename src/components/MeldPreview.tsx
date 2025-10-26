import type { MiscTileSlug, Tile } from "../domain/types";
import MiscTileSvg from "./TileSvg/MiscTileSvg";
import TileSvg from "./TileSvg/TileSvg";

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
  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: `repeat(${tiles.length}, 1fr)`,
        width: "100%",
        gap: "8px",
      }}
    >
      {tileElements}
    </div>
  );
};

export default MeldPreview;
