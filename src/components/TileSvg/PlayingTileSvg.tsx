import type React from "react";
import type { Tile } from "../../domain/types";
import { getTileSlug } from "../../domain/tiles";
import { tileSvgs } from "../../domain/svgs";
import BaseTileSvg, {
  type SharedTileSvgProps,
} from "./BaseTileSvg/BaseTileSvg";

interface PlayingTileSvgProps extends SharedTileSvgProps {
  tile: Tile;
}

const PlayingTileSvg: React.FC<PlayingTileSvgProps> = ({
  tile,
  alt = `The ${tile.value} ${tile.suit} tile`,
  className,
  imgClassName,
}: PlayingTileSvgProps) => {
  const tileSlug = getTileSlug(tile);
  const svgFile = tileSvgs[tileSlug];
  return (
    <BaseTileSvg
      src={svgFile}
      alt={alt}
      className={className}
      imgClassName={imgClassName}
      faceDirection="faceUp"
    />
  );
};

export default PlayingTileSvg;
