import type React from "react";
import type { Tile } from "../../domain/types";
import { getTileSlug } from "../../domain/tiles";
import { tileSvgs } from "../../domain/svgs";

type TileSvgProps = {
  tile: Tile;
  altText?: string;
};

const TileSvg: React.FC<TileSvgProps> = ({ tile, altText }: TileSvgProps) => {
  const tileSlug = getTileSlug(tile);
  const svgFile = tileSvgs[tileSlug];
  return (
    <InnerTileSvg
      src={svgFile}
      alt={altText ?? `The ${tile.value} ${tile.suit} tile`}
    />
  );
};

export default TileSvg;

interface InnerTileSvgProps {
  src: string;
  alt?: string;
}
export const InnerTileSvg: React.FC<InnerTileSvgProps> = ({ src, alt }) => {
  return <img src={src} alt={alt} />;
};
