import { useState } from "react";
import type { MeldState, Tile } from "../../domain/types";
import { isTileChowable } from "../../domain/tiles";

const initialMelds = [0, 1, 2, 3].map(
  (): MeldState => ({ type: null, tile: null })
);

export const useMahjongMelds = () => {
  const [melds, setMelds] = useState<MeldState[]>(initialMelds);
  const onMeldChange = (
    meldIndex: number,
    newPartialMeld: Partial<MeldState>
  ) => {
    setMelds((currMelds) => {
      const newMelds = [...currMelds];

      const newMeld = { ...currMelds[meldIndex], ...newPartialMeld };
      // Override chow to pong if it's not valid
      if (newMeld.type === "chow" && !isTileChowable(newMeld.tile)) {
        newMeld.type = "pong";
      }

      newMelds[meldIndex] = newMeld;
      return newMelds;
    });
  };

  return { melds, onMeldChange };
};

const useMahjongHand = () => {
  const { melds, onMeldChange } = useMahjongMelds();
  const [pair, setPair] = useState<Tile | null>(null);

  const onPairChange = (newPair: Tile | null) => {
    setPair(newPair);
  };

  return { melds, pair, onPairChange, onMeldChange };
};

export default useMahjongHand;
