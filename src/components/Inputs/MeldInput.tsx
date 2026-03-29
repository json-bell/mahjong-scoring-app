import { useState } from "react";
import type { Meld } from "../../domain/types";
import MeldPreview from "../MeldPreview/MeldPreview";
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
import meldToTilePreviews from "../../domain/mappers/meldToTiles";

interface MeldInputProps {
  meldValue: Meld;
  onMeldChange: (newPartialMeld: Partial<Meld>) => void;
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

  const previewedMeld = meldToTilePreviews(
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
              if (autoContinue || !viewedSuit) setStep("suit");
              else if (!meldValue.tile?.value) setStep("tileValue");
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
              setStep("tileValue");
              if (newSuit !== meldValue.tile?.suit)
                onMeldChange({ tile: null });
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
              if (!viewedSuit) setViewedSuit(newTile?.suit ?? null);
              if (!isPair && !meldValue.type) setStep("meldType");
              else onModalClose();
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
          <MeldPreview previews={previewedMeld} />
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
