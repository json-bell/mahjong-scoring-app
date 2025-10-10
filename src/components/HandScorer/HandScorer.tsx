import { useState } from "react";
import {
  scoreHand,
  type HandCreateSchema,
  type MeldSchemaInput,
} from "../../api";
import useMahjongHand from "../../hooks/mahjong/useMahjongHands";
import TileInput from "../Inputs/TileInput";
import type { Tile } from "../../domain/types";
import MeldInput from "../Inputs/MeldInput";

export const HandScorer = () => {
  const [result, setResult] = useState<unknown>(null);
  const { melds, pair, onMeldChange, onPairChange } = useMahjongHand();

  const onScoreHand = () => {
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

    scoreHand({ body: hand })
      .then((response) => {
        if (response.status === 400) {
          setResult(response.error);
          console.error(response.error);
        }
        if (response.status === 200) setResult(response.data);
      })
      .catch((err) => {
        console.error(err);
      });
  };

  return (
    <>
      <div
        style={{
          width: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        {melds.map((meld, meldIndex) => {
          const id = `meld-input-${meldIndex}`;

          return (
            <MeldInput
              key={id}
              inputId={id}
              meld={meld}
              name={`Meld ${meldIndex}`}
              onMeldChange={(newPartialMeld) =>
                onMeldChange(meldIndex, newPartialMeld)
              }
            />
          );
        })}
        <fieldset>
          <legend>Pair</legend>
          <TileInput inputId="pair" onTileSelect={onPairChange} tile={pair} />
        </fieldset>
      </div>
      <button onClick={onScoreHand} type="button">
        Score Hand
      </button>
      <fieldset>
        <legend>Result:</legend>
        {JSON.stringify(result)}
      </fieldset>
    </>
  );
};
