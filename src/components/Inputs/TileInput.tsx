import { useState } from "react";
import type { Suit } from "../../api";
import type { Tile } from "../../domain/types";
import { getTileSlug, tilesBySuit } from "../../domain/tiles";
import { suits } from "../../domain/enums";

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
      <ul
        style={{
          padding: "0px",
          display: "flex",
          justifyContent: "space-evenly",
        }}
      >
        {suitOptions.map((suitOption) => (
          <li style={{ listStyle: "none" }} key={suitOption}>
            <label
              style={{
                display: "flex",
                flexDirection: "column",
                padding: "0px 12px",
                cursor: "pointer",
              }}
            >
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
          </li>
        ))}
      </ul>

      {suit ? (
        <ul
          style={{
            padding: "0px",
            display: "flex",
            justifyContent: "space-evenly",
          }}
        >
          {tilesBySuit[suit].map((tileOption) => {
            const tileOptionSlug = getTileSlug(tileOption);
            return (
              <li style={{ listStyle: "none" }} key={tileOptionSlug}>
                <label
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    padding: "0px 12px",
                    cursor: "pointer",
                  }}
                >
                  <input
                    type="radio"
                    value={tileOptionSlug}
                    checked={tileOptionSlug === tileSlug}
                    name={`${inputId}-tile`}
                    onChange={() => {
                      onTileSelect(tileOption);
                    }}
                  />
                  {tileOption.value}
                </label>
              </li>
            );
          })}
        </ul>
      ) : (
        "Please select a suit for the tile"
      )}
    </div>
  );
};

export default TileInput;
