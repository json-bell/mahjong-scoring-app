import { useState } from "react";
import type { MeldState, NumberedSuit, Tile } from "../../domain/types";
import MeldPreview, { type MeldPreviewProps } from "../MeldPreview";
import { isHonour, parseNumberValue } from "../../domain/tiles";
import { meldTypes, numberedSuits, suits } from "../../domain/enums";
import TileInput from "./TileInput";
import type { MeldType } from "../../api";

interface MeldInputProps {
  meld: MeldState;
  onMeldChange: (newPartialMeld: Partial<MeldState>) => void;
  name: string;
  inputId: string;
}

const MeldInput: React.FC<MeldInputProps> = ({
  meld,
  onMeldChange,
  inputId,
  name,
}) => {
  const [inputStep, setInputStep] = useState<
    "meldType" | "suit" | "value" | null
  >(null);
  // resets when closing the input

  const [selectedType, setSelectedType] = useState<MeldType | null>(null);
  const validSuits = selectedType === "chow" ? numberedSuits : suits;
  const [selectedTile, setSelectedTile] = useState<Tile | null>(null);

  const onAttemptedSubmit = ({ type, tile }: MeldState) => {
    if (!type || !tile) return;

    onMeldChange({ type, tile });
    setInputStep(null);
  };

  const previewedMeld = getPreviewTiles(meld);

  return (
    <>
      {/* CURRENTLY SELECTED MELD */}
      <fieldset
        style={{ width: "50%", position: "relative", maxWidth: "500px" }}
      >
        <legend>{name}</legend>
        <button
          type={"button"}
          style={{
            background: "none",
            border: "3px solid grey",
            width: "100%",
          }}
          onClick={() => {
            // reset when opening
            setSelectedTile(null);
            setSelectedType(null);
            setInputStep("meldType");
          }}
        >
          <MeldPreview tiles={previewedMeld} />
        </button>
        {inputStep && (
          <div
            style={{
              zIndex: 10,
              position: "absolute",
              top: 0,
              left: 0,
              backgroundColor: "grey",
              border: "3px solid white",
              minHeight: "320px",
              width: "100%",
              boxShadow: "8px 20px 16px magenta",
            }}
          >
            <ul
              style={{
                padding: "0px",
                display: "flex",
                justifyContent: "space-evenly",
              }}
            >
              {meldTypes.map((typeOption) => (
                <li style={{ listStyle: "none" }} key={typeOption}>
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
                      value={typeOption}
                      checked={selectedType === typeOption}
                      name={`meld-${inputId}-type`}
                      onChange={() => {
                        setSelectedType(typeOption);
                        onAttemptedSubmit({
                          tile: selectedTile,
                          type: typeOption,
                        });
                      }}
                    />
                    {typeOption}
                  </label>
                </li>
              ))}
            </ul>
            <TileInput
              inputId={`meld-input-tile-${inputId}`}
              tile={selectedTile}
              suitOptions={validSuits}
              onTileSelect={(newTile) => {
                setSelectedTile(newTile);
                onAttemptedSubmit({
                  tile: newTile,
                  type: selectedType,
                });
              }}
            />

            <button
              style={{
                position: "absolute",
                bottom: 0,
                left: "50%",
                transform: "translate(-50%,100%)",
                border: "3px solid white",
                borderRadius: "0px 0px 16px 16px",
                backgroundColor: "grey",
              }}
              onClick={() => {
                setInputStep(null);
              }}
            >
              Close
            </button>
          </div>
        )}
      </fieldset>
    </>
  );
};

export default MeldInput;

const getPreviewTiles = ({
  tile,
  type,
}: MeldState): MeldPreviewProps["tiles"] => {
  const defaultTiles: MeldPreviewProps["tiles"] = [1, 2, 3].map(() => ({
    miscTileSlug: "any",
  }));

  if (!type || !tile) return defaultTiles;

  if (type === "pong") return [{ tile }, { tile }, { tile }];
  if (type === "kong") return [{ tile }, { tile }, { tile }, { tile }];

  // else type chow
  if (isHonour(tile.suit)) return [{ tile }, ...defaultTiles.slice(0, 2)];

  const numberedSuit: NumberedSuit = tile.suit;
  const numberValue = Number(tile.value);

  const tiles: MeldPreviewProps["tiles"] = [0, 1, 2].map((increment) => {
    const value = numberValue + increment;
    const parsedValue = parseNumberValue(value);
    if (!parsedValue) return { miscTileSvgs: "errors" };

    return { tile: { suit: numberedSuit, value: parsedValue } };
  });

  return tiles;
};
