import type React from "react";
import { miscTileSvgs } from "../../assets/tiles";
import type { MiscTileSlug } from "../../domain/types";
import { InnerTileSvg, type InnerTileSvgProps } from "./TileSvg";

interface MiscTileSvgProps extends Omit<InnerTileSvgProps, "src"> {
  slug: MiscTileSlug;
}

const defaultAltTexts: Record<MiscTileSlug, string> = {
  any: "Tile placeholder",
  error: "Error tile",
  hidden: "Hidden tile",
};

const MiscTileSvg: React.FC<MiscTileSvgProps> = ({
  slug,
  alt = defaultAltTexts[slug],
  className,
  imgClassName,
}) => {
  const svgFile = miscTileSvgs[slug];

  return (
    <InnerTileSvg
      src={svgFile}
      alt={alt}
      className={className}
      imgClassName={imgClassName}
    />
  );
};

export default MiscTileSvg;
