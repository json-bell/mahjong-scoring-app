import type { Suit } from "../../api";
import type { Tile } from "../../domain/types";
import { getTileSlug, tilesBySuit } from "../../domain/tiles";
import { suits } from "../../domain/enums";
import PlayingTileSvg from "../TileSvg/PlayingTileSvg";
import styles from "./TileInput.module.scss";
import { cx } from "../../utils/classNames";

interface TileInputProps {
  tile: Tile | null;
  onTileSelect: (newTile: Tile | null) => void;
  suitOptions?: Suit[];
  inputId: string;
}

const TileInput = ({
  tile,
  onTileSelect,
  suitOptions = suits,
  inputId,
}: TileInputProps) => {
  const tileSlug = tile ? getTileSlug(tile) : "none";

  return (
    <fieldset
      className={cx(
        styles.radioTiles,
        suitOptions.length === 1 && suitOptions[0] === "wind"
          ? styles.fourTilesGrid
          : undefined
      )}
    >
      <legend className={"sr-only"}>Tile</legend>
      {suitOptions.map((suit) => {
        return tilesBySuit[suit].map((tileOption) => {
          const tileOptionSlug = getTileSlug(tileOption);
          return (
            <label key={tileOptionSlug}>
              <input
                type="radio"
                value={tileOptionSlug}
                checked={tileOptionSlug === tileSlug}
                name={`${inputId}-tile`}
                onChange={() => {
                  onTileSelect(tileOption);
                }}
              />
              <PlayingTileSvg tile={tileOption} />
              {tileOption.value}
            </label>
          );
        });
      })}
    </fieldset>
  );
};

export default TileInput;
