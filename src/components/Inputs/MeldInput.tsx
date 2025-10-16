import { useState } from "react";
import type { MeldState, NumberedSuit, Tile } from "../../domain/types";
import MeldPreview, { type MeldPreviewProps } from "../MeldPreview";
import { isHonour, parseNumberValue } from "../../domain/tiles";
import { meldTypes, numberedSuits, suits } from "../../domain/enums";
import TileInput from "./TileInput";
import type { MeldType } from "../../api";
import styles from "./Inputs.module.scss";
import Modal from "../UI/Modal/Modal";

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
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const onModalClose = () => {
    setIsModalOpen(false);
  };

  // resets when closing the input
  const [selectedType, setSelectedType] = useState<MeldType | null>(null);
  const validSuits = selectedType === "chow" ? numberedSuits : suits;
  const [selectedTile, setSelectedTile] = useState<Tile | null>(null);

  const onAttemptedSubmit = ({ type, tile }: MeldState) => {
    if (!type || !tile) return;

    onMeldChange({ type, tile });
    onModalClose();
  };
  const onClearInternal = () => {
    setSelectedTile(null);
    setSelectedType(null);
  };

  const previewedMeld = getPreviewTiles(meld);

  return (
    <>
      {/* CURRENTLY SELECTED MELD */}
      <fieldset
        style={{
          width: "80%",
          position: "relative",
          maxWidth: "500px",
        }}
      >
        <legend>{name}</legend>
        <button
          type={"button"}
          style={{
            background: "none",
            border: "none",
            width: "100%",
          }}
          onClick={() => {
            // reset when opening
            onClearInternal();
            setIsModalOpen(true);
          }}
        >
          <MeldPreview tiles={previewedMeld} />
        </button>
        <Modal
          isOpen={isModalOpen}
          onClose={onModalClose}
          closeButtonContents={"Close"}
        >
          <fieldset className={styles.inputModal}>
            <legend className={"sr-only"}>Meld Input</legend>

            <fieldset className={styles.radioPills}>
              <legend>Meld Type</legend>
              {meldTypes.map((typeOption) => (
                <label className={styles.pill} key={typeOption}>
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
              ))}
            </fieldset>
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
          </fieldset>
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
