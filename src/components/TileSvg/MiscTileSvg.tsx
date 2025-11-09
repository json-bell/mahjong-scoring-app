import type React from "react";
import { miscTileSvgs } from "../../assets/tiles";
import type { MiscTileSlug } from "../../domain/types";
import type { SharedTileSvgProps } from "./BaseTileSvg/BaseTileSvg";
import BaseTileSvg from "./BaseTileSvg/BaseTileSvg";

interface MiscTileSvgProps extends SharedTileSvgProps {
  slug: MiscTileSlug;
}

const defaultAltTexts: Record<MiscTileSlug, string> = {
  any: "Tile placeholder",
  error: "Error tile",
  hidden: "Hidden tile",
};

const tileDirections: Record<MiscTileSlug, "faceUp" | "faceDown"> = {
  any: "faceDown",
  error: "faceUp",
  hidden: "faceDown",
};

const MiscTileSvg: React.FC<MiscTileSvgProps> = ({
  slug,
  alt = defaultAltTexts[slug],
  className,
  imgClassName,
}) => {
  const svgFile = miscTileSvgs[slug];

  return (
    <BaseTileSvg
      src={svgFile}
      alt={alt}
      className={className}
      imgClassName={imgClassName}
      faceDirection={tileDirections[slug]}
    />
  );
};

export default MiscTileSvg;
