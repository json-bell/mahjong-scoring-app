import type { MiscTileSlug, Tile } from "../../domain/types";
import MiscTileSvg from "../TileSvg/MiscTileSvg";
import TileSvg from "../TileSvg/PlayingTileSvg";

export type TilePreview = {
  tile?: Tile;
  miscTileSlug?: MiscTileSlug;
};

type GeneralisedTileProps = {
  preview: TilePreview;
};

const GeneralisedTile: React.FC<GeneralisedTileProps> = ({ preview }) => {
  const { miscTileSlug, tile } = preview;
  if (tile) return <TileSvg tile={tile} />;
  if (miscTileSlug) return <MiscTileSvg slug={miscTileSlug} />;
  return <MiscTileSvg slug={"error"} />;
};

export default GeneralisedTile;
