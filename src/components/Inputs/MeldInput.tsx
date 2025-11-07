import { useState } from "react";
import type { MeldState, NumberedSuit, Tile } from "../../domain/types";
import MeldPreview, {
  type MeldPreviewProps,
  type TilePreview,
} from "../MeldPreview/MeldPreview";
import { isHonour, parseNumberValue } from "../../domain/tiles";
import { meldTypes, suits } from "../../domain/enums";
import TileInput from "./TileInput";
import styles from "./MeldInput.module.scss";
import Modal from "../Modal/Modal";
import TabbedContent, {
  type TabbedContentProps,
} from "../TabbedContent/TabbedContent";
import RadioList, { type RadioType } from "../RadioList/RadioList";
import type { MeldType, Suit } from "../../api";
import { capitalise } from "../../utils/text-utils";

interface MeldInputProps {
  meldValue: MeldState;
  onMeldChange: (newPartialMeld: Partial<MeldState>) => void;
  legend: string;
  inputId: string;
  isPair?: boolean;
}

const MeldInput: React.FC<MeldInputProps> = ({
  meldValue,
  onMeldChange,
  inputId,
  legend,
  isPair = false,
}) => {
  const [step, setStep] = useState<"meldType" | "suit" | "tileValue" | null>(
    null
  );
  const [autoContinue, setAutoContinue] = useState(true);
  const [viewedSuit, setViewedSuit] = useState<Suit | null>(null);

  const isModalOpen = !!step;
  const onModalOpen = () => {
    setStep(isPair ? "suit" : "meldType");
    setAutoContinue(true);
    if (meldValue.tile) setViewedSuit(meldValue.tile.suit);
  };
  const onModalClose = () => {
    setStep(null);
  };

  const onInputClear = () => {
    onMeldChange({ tile: null, type: null });
    setViewedSuit(null);
    setStep(null);
    setAutoContinue(true);
  };

  const previewedMeld = getPreviewTiles(
    isPair ? { tile: meldValue.tile, type: "pair" } : meldValue
  );

  const meldTypeRadios = meldTypes.map(
    (option): RadioType<MeldType> => ({
      label: option,
      value: option,
    })
  );
  const suitRadios = suits.map(
    (option): RadioType<Suit> => ({ label: option, value: option })
  );

  const inputTabs: TabbedContentProps<
    "meldType" | "suit" | "tileValue"
  >["tabs"] = (
    [
      {
        tabSlug: "meldType",
        tabLabel: (
          <div className={styles.tabLabel}>
            <span>Type</span>
            <span>{capitalise(meldValue.type) ?? "-"}</span>
          </div>
        ),
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
        tabLabel: (
          <div className={styles.tabLabel}>
            <span>Suit</span>
            <span>{capitalise(viewedSuit) ?? "-"}</span>
          </div>
        ),
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
        tabLabel: (
          <div className={styles.tabLabel}>
            <span>Tile</span>
            <span>{capitalise(meldValue.tile?.value) ?? "-"}</span>
          </div>
        ),
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
    ] as const
  ).filter(({ tabSlug }) => !(isPair && tabSlug === "meldType"));

  return (
    <>
      <button
        type={"button"}
        onClick={onModalOpen}
        className={styles.meldInputWrapper}
      >
        <fieldset className={styles.meldInput}>
          <legend className={styles.meldInputLegend}>{legend}</legend>
          <MeldPreview tiles={previewedMeld} />
        </fieldset>
      </button>
      <Modal
        isOpen={isModalOpen}
        onClose={onModalClose}
        belowButtons={[
          {
            contents: "Clear",
            onClick: onInputClear,
            id: "Clear",
            buttonStyle: "secondary",
          },
          {
            contents: "Save",
            onClick: onModalClose,
            id: "Save",
            buttonStyle: "primary",
          },
        ]}
      >
        {step && (
          <TabbedContent
            onTabSelect={(newTab) => {
              setStep(newTab);
              setAutoContinue(false);
            }}
            activeTab={step}
            radioId={`meld-${inputId}-step-radio`}
            tabs={inputTabs}
          />
        )}
      </Modal>
    </>
  );
};

export default MeldInput;

type PreviewedTileParams = MeldState | { type: "pair"; tile: Tile | null };

const defaultTiles: MeldPreviewProps["tiles"] = [1, 2, 3].map(() => ({
  miscTileSlug: "any",
}));

const getPreviewTiles = ({
  tile,
  type,
}: PreviewedTileParams): MeldPreviewProps["tiles"] => {
  if (type === "pair") {
    if (!tile) return defaultTiles.slice(0, 2);
    return [{ tile }, { tile }];
  }
  if (!type || !tile) return defaultTiles;

  if (type === "pong") return [{ tile }, { tile }, { tile }];
  if (type === "kong") return [{ tile }, { tile }, { tile }, { tile }];

  // else type chow
  if (isHonour(tile.suit))
    return [{ tile }, { miscTileSlug: "error" }, { miscTileSlug: "error" }];

  const numberedSuit: NumberedSuit = tile.suit;
  const numberValue = Number(tile.value);

  const tiles: MeldPreviewProps["tiles"] = [0, 1, 2].map(
    (increment): TilePreview => {
      const value = numberValue + increment;
      const parsedValue = parseNumberValue(value);
      if (!parsedValue) return { miscTileSlug: "error" };

      return { tile: { suit: numberedSuit, value: parsedValue } };
    }
  );

  return tiles;
};
