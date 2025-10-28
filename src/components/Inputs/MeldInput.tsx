import { useState } from "react";
import type { MeldState, NumberedSuit } from "../../domain/types";
import MeldPreview, { type MeldPreviewProps } from "../MeldPreview/MeldPreview";
import { isHonour, parseNumberValue } from "../../domain/tiles";
import { meldTypes, numberedSuits, suits } from "../../domain/enums";
import TileInput from "./TileInput";
import inputStyles from "./Inputs.module.scss";
import styles from "./MeldInput.module.scss";
import Modal from "../Modal/Modal";

interface MeldInputProps {
  meldValue: MeldState;
  onMeldChange: (newPartialMeld: Partial<MeldState>) => void;
  name: string;
  inputId: string;
}

const MeldInput: React.FC<MeldInputProps> = ({
  meldValue,
  onMeldChange,
  inputId,
  name,
}) => {
  const [step, setStep] = useState<"meldType" | "suit" | "tileValue" | null>(
    null
  );

  const onModalClose = () => {
    setStep(null);
  };
  const isModalOpen = !!step;

  const validSuits = meldValue.type === "chow" ? numberedSuits : suits;

  const previewedMeld = getPreviewTiles(meldValue);

  return (
    <>
      <fieldset className={styles.meldInput}>
        <legend>{name}</legend>
        <button
          type={"button"}
          style={{
            background: "none",
            border: "none",
            width: "100%",
          }}
          onClick={() => {
            setStep("meldType");
          }}
        >
          <MeldPreview tiles={previewedMeld} />
        </button>
        <Modal
          isOpen={isModalOpen}
          onClose={onModalClose}
          closeButtonContents={"Close"}
        >
          <fieldset className={inputStyles.radioPills}>
            <legend>Meld Type</legend>
            {meldTypes.map((typeOption) => (
              <label className={inputStyles.pill} key={typeOption}>
                <input
                  type="radio"
                  value={typeOption}
                  checked={meldValue.type === typeOption}
                  name={`meld-${inputId}-type`}
                  onChange={() => {
                    onMeldChange({ type: typeOption });
                  }}
                />
                {typeOption}
              </label>
            ))}
          </fieldset>
          <TileInput
            inputId={`meld-input-tile-${inputId}`}
            tile={meldValue.tile}
            suitOptions={validSuits}
            onTileSelect={(newTile) => {
              onMeldChange({ tile: newTile });
            }}
          />
        </Modal>
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
