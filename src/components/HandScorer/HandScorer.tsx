import { useState } from "react";
import {
  scoreHand,
  type HandCreateSchema,
  type HandScoreExplanation,
  type MeldSchemaInput,
} from "../../api";
import useMahjongHand from "../../hooks/mahjong/useMahjongHands";
import TileInput from "../Inputs/TileInput";
import type { Tile } from "../../domain/types";
import MeldInput from "../Inputs/MeldInput";
import styles from "./HandScorer.module.scss";

export const HandScorer = () => {
  const [result, setResult] = useState<HandScoreExplanation | null>(null);
  const [error, setError] = useState<unknown>(null);
  const { melds, pair, onMeldChange, onPairChange } = useMahjongHand();

  const onScoreHand = () => {
    const areInputsValid = melds.every(
      (meld): meld is MeldSchemaInput & { tile: Tile } => {
        return !!(meld.tile && meld.type);
      }
    );
    if (!areInputsValid) {
      setError("Meld combination is not valid");
      return;
    }

    const hand: HandCreateSchema = {
      melds,
      pair: { suit: "circle", value: "5" },
    };

    scoreHand({ body: hand })
      .then((response) => {
        if (response.status === 400) {
          setError(response.error);
          console.error(response.error);
        }
        if (response.status === 200) {
          setResult(response.data ?? null);
          setError(null);
        }
      })
      .catch((err) => {
        console.error(err);
      });
  };

  return (
    <>
      <div className={styles.inputList}>
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
      <button
        onClick={onScoreHand}
        type="button"
        className={styles.scoreButton}
      >
        Score Hand
      </button>
      <fieldset>
        <legend>Score</legend>
        {error ? (
          `Error: ${JSON.stringify(error)}`
        ) : result ? (
          <>
            <h2
              style={{
                boxShadow: "0px 0px 32px magenta",
                backgroundColor: "black",
                display: "inline-block",
                padding: "8px 16px",
                borderRadius: "8px",
              }}
            >
              {result.score}
            </h2>
            <h3>Description:</h3>
            <ul>
              {result.explanation.map(({ name, description, slug }) => (
                <li key={slug}>
                  <b>{name}</b>: {description}
                </li>
              ))}
            </ul>
          </>
        ) : (
          "Input your hand, then click the 'Score Hand' button"
        )}
      </fieldset>
    </>
  );
};
