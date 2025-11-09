import styles from "./TileSvg.module.scss";
import { cx } from "../../../utils/classNames";
import { useState } from "react";

export interface TileSvgRenderProps {
  src: string;
  faceDirection: "faceUp" | "faceDown";
}

export interface SharedTileSvgProps {
  alt?: string;
  className?: string;
  imgClassName?: string;
}

export interface BaseTileSvgProps
  extends TileSvgRenderProps,
    SharedTileSvgProps {}

const BaseTileSvg: React.FC<BaseTileSvgProps> = ({
  src,
  alt,
  className,
  imgClassName,
  faceDirection = "faceUp",
}) => {
  const [isLoaded, setIsLoaded] = useState(false);

  return (
    <>
      <div className={cx(styles.tileImgContainer, className)}>
        {!isLoaded && (
          <SkeletonTileSvg
            faceDirection={faceDirection}
            imgClassName={imgClassName}
          />
        )}
        <img
          src={src}
          alt={alt}
          onLoad={() => {
            setIsLoaded(true);
          }}
          className={cx(styles.tileImg, imgClassName)}
        />
      </div>
    </>
  );
};

export default BaseTileSvg;

const SkeletonTileSvg: React.FC<
  Pick<BaseTileSvgProps, "faceDirection" | "imgClassName">
> = ({ faceDirection, imgClassName }) => {
  return (
    <div
      className={cx(styles.tileImg, styles.loadingPlaceholder, imgClassName)}
    >
      <div className={cx(styles.loadingRectBorder, styles.frontBorder)} />

      <div className={cx(styles.loadingRectBorder, styles.backBorder)} />
      <div
        className={cx(
          styles.loadingTileRect,
          styles.loadingBackRect,
          styles.loadingShimmer,
          styles[`${faceDirection}Back`]
        )}
      />
      <div
        className={cx(
          styles.loadingTileRect,
          styles.loadingFrontRect,
          styles.loadingShimmer,
          styles[`${faceDirection}Front`]
        )}
      />
    </div>
  );
};
