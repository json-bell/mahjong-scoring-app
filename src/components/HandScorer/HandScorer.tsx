import { useState } from "react";
import {
  scoreHand,
  type HandCreateSchema,
  type MeldSchemaInput,
} from "../../api";
import { meldTypes, numberedSuits, suits } from "../../domain/enums";
import useMahjongHand from "../../hooks/mahjong/useMahjongHands";
import TileInput from "../Inputs/TileInput";
import type { Tile } from "../../domain/types";

export const HandScorer = () => {
  const [result, setResult] = useState<unknown>(null);
  const { melds, pair, onMeldChange, onPairChange } = useMahjongHand();

  const onScoreHand = async () => {
    const areInputsValid = melds.every(
      (meld): meld is MeldSchemaInput & { tile: Tile } => {
        return !!(meld.tile && meld.type);
      }
    );
    if (!areInputsValid) {
      setResult("Meld combination is not valid");
      return;
    }

    const hand: HandCreateSchema = {
      game_id: 1,
      melds,
      pair: { suit: "circle", value: "5" },
    };

    const response = await scoreHand({ body: hand });
    if (response.status === 400) {
      setResult(response.error);
      console.error(response.error);
    }
    if (response.status === 200) setResult(response.data);
  };

  return (
    <>
      <div style={{ width: "100%" }}>
        {melds.map(({ type, tile }, meldIndex) => {
          const validSuits = type === "chow" ? numberedSuits : suits;

          return (
            <fieldset
              style={{
                display: "flex",
                flexDirection: "column",
              }}
              key={`meld-${meldIndex}`}
            >
              <legend>Meld {meldIndex + 1}</legend>
              {/* -----------
                   MELD TYPE 
                  ----------- */}
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
                        checked={type === typeOption}
                        id={`meld-${meldIndex}-type`}
                        onChange={() => {
                          onMeldChange(meldIndex, { type: typeOption });
                        }}
                      />
                      {typeOption}
                    </label>
                  </li>
                ))}
              </ul>
              <TileInput
                inputId={`meld-${meldIndex}`}
                tile={tile}
                suitOptions={validSuits}
                onTileSelect={(newTile) => {
                  onMeldChange(meldIndex, { tile: newTile });
                }}
              />
            </fieldset>
          );
        })}
        <fieldset>
          <legend>Pair</legend>
          <TileInput inputId="pair" onTileSelect={onPairChange} tile={pair} />
        </fieldset>
      </div>
      <button onClick={void onScoreHand} type="button">
        Score Hand
      </button>
      <fieldset>
        <legend>Result:</legend>
        {JSON.stringify(result, null, 4).replace("\n", "\n\n\n      ______")}
      </fieldset>
    </>
  );
};
