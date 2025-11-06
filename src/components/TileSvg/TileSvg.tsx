import type React from "react";
import type { Tile } from "../../domain/types";
import { getTileSlug } from "../../domain/tiles";
import { tileSvgs } from "../../domain/svgs";
import styles from "./TileSvg.module.scss";
import { cx } from "../../utils/classNames";

interface TileSvgProps extends Omit<InnerTileSvgProps, "src"> {
  tile: Tile;
}

const TileSvg: React.FC<TileSvgProps> = ({
  tile,
  alt = `The ${tile.value} ${tile.suit} tile`,
  className,
  imgClassName,
}: TileSvgProps) => {
  const tileSlug = getTileSlug(tile);
  const svgFile = tileSvgs[tileSlug];
  return (
    <InnerTileSvg
      src={svgFile}
      alt={alt}
      className={className}
      imgClassName={imgClassName}
    />
  );
};

export default TileSvg;

export interface InnerTileSvgProps {
  src: string;
  alt?: string;
  className?: string;
  imgClassName?: string;
}
export const InnerTileSvg: React.FC<InnerTileSvgProps> = ({
  src,
  alt,
  className,
  imgClassName,
}) => {
  return (
    <div className={cx(styles.tileImgContainer, className)}>
      <img src={src} alt={alt} className={cx(styles.tileImg, imgClassName)} />
    </div>
  );
};
