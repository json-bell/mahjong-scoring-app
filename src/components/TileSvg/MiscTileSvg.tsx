import type React from "react";
import { miscTileSvgs } from "../../assets/tiles";
import type { MiscTileSlug } from "../../domain/types";
import { InnerTileSvg } from "./TileSvg";

interface MiscTileSvgProps {
  slug: MiscTileSlug;
  altText?: string;
}

const defaultAltTexts: Record<MiscTileSlug, string> = {
  any: "Tile placeholder",
  error: "Error tile",
  hidden: "Hidden tile",
};

const MiscTileSvg: React.FC<MiscTileSvgProps> = ({ slug, altText }) => {
  const svgFile = miscTileSvgs[slug];

  return <InnerTileSvg src={svgFile} alt={altText ?? defaultAltTexts[slug]} />;
};

export default MiscTileSvg;
