import { useState } from "react";
import type { Suit } from "../../api";
import type { Tile } from "../../domain/types";
import { getTileSlug, tilesBySuit } from "../../domain/tiles";
import { suits } from "../../domain/enums";
import TileSvg from "../TileSvg/TileSvg";
import styles from "./Inputs.module.scss";

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
  const [suit, setSuit] = useState<Suit | null>(null);
  const tileSlug = tile ? getTileSlug(tile) : "none";

  return (
    <div>
      <fieldset className={styles.radioPills}>
        <legend>Suit</legend>
        {suitOptions.map((suitOption) => (
          <label key={suitOption}>
            <input
              type="radio"
              value={suitOption}
              checked={suit === suitOption}
              name={`${inputId}-suit`}
              onChange={() => {
                setSuit(suitOption);
              }}
            />
            {suitOption}
          </label>
        ))}
      </fieldset>

      {suit ? (
        <fieldset
          className={`${styles.radioTiles} ${
            tilesBySuit[suit].length === 4 ? styles.fourTilesGrid : ""
          }`}
        >
          <legend>Tile</legend>
          {tilesBySuit[suit].map((tileOption) => {
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
                <TileSvg tile={tileOption} />
                {tileOption.value}
              </label>
            );
          })}
        </fieldset>
      ) : (
        "Please select a suit for the tile"
      )}
    </div>
  );
};

export default TileInput;
