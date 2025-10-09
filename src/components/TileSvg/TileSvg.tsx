import type React from "react";
import type { Tile } from "../../domain/types";
import { getTileSlug } from "../../domain/tiles";
import { tileSvgs } from "../../domain/tileSvgs";

type TileSvgProps = {
  tile: Tile;
};

const TileSvg: React.FC<TileSvgProps> = ({ tile }: TileSvgProps) => {
  const tileSlug = getTileSlug(tile);
  const altText = `The ${tile.value} ${tile.suit} tile`;
  const svgFile = tileSvgs[tileSlug];
  return <img src={svgFile} alt={altText} />;
};

export default TileSvg;
