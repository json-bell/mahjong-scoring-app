import { useState } from "react";
import type { MeldState, NumberedSuit } from "../../domain/types";
import MeldPreview, { type MeldPreviewProps } from "../MeldPreview/MeldPreview";
import { isHonour, parseNumberValue } from "../../domain/tiles";
import { meldTypes, suits } from "../../domain/enums";
import TileInput from "./TileInput";
import styles from "./MeldInput.module.scss";
import Modal from "../Modal/Modal";
import TabbedContent from "../TabbedContent/TabbedContent";
import RadioList, { type RadioType } from "../RadioList/RadioList";
import type { MeldType, Suit } from "../../api";

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
  const [autoContinue, setAutoContinue] = useState(true);
  const [viewedSuit, setViewedSuit] = useState<Suit | null>(null);

  const isModalOpen = !!step;
  const onModalOpen = () => {
    setStep("meldType");
    setAutoContinue(true);
  };
  const onModalClose = () => {
    setStep(null);
  };

  const previewedMeld = getPreviewTiles(meldValue);

  const meldTypeRadios = meldTypes.map(
    (option): RadioType<MeldType> => ({
      label: option,
      value: option,
    })
  );
  const suitRadios = suits.map(
    (option): RadioType<Suit> => ({ label: option, value: option })
  );

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
          onClick={onModalOpen}
        >
          <MeldPreview tiles={previewedMeld} />
        </button>
        <Modal
          isOpen={isModalOpen}
          onClose={onModalClose}
          closeButtonContents={"Close"}
        >
          {step && (
            <TabbedContent
              onTabSelect={(newTab) => {
                setStep(newTab);
                setAutoContinue(false);
              }}
              activeTab={step}
              radioId={`meld-${inputId}-step-radio`}
              tabs={[
                {
                  tabSlug: "meldType",
                  tabLabel: "Meld Type",
                  children: (
                    <RadioList
                      id={`meld-${inputId}-type`}
                      onChange={(newType) => {
                        onMeldChange({ type: newType });
                        if (autoContinue) setStep("suit");
                      }}
                      radios={meldTypeRadios}
                      selected={meldValue.type}
                      legend="Meld Type"
                    />
                  ),
                },
                {
                  tabSlug: "suit",
                  tabLabel: "Suit",
                  children: (
                    <RadioList
                      id={`meld-${inputId}-suit`}
                      onChange={(newSuit) => {
                        setViewedSuit(newSuit);
                        if (autoContinue) setStep("tileValue");
                      }}
                      radios={suitRadios}
                      selected={viewedSuit}
                      legend="Suit"
                    />
                  ),
                },
                {
                  tabSlug: "tileValue",
                  tabLabel: "Tile",
                  children: (
                    <TileInput
                      inputId={`meld-input-tile-${inputId}`}
                      tile={meldValue.tile}
                      suitOptions={viewedSuit ? [viewedSuit] : suits}
                      onTileSelect={(newTile) => {
                        onMeldChange({ tile: newTile });
                        if (autoContinue) onModalClose();
                      }}
                    />
                  ),
                },
              ]}
            />
          )}
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
