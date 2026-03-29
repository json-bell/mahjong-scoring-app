import { useState } from "react";
import type { Meld, Tile } from "../../domain/types";

const initialMelds = [0, 1, 2, 3].map((): Meld => ({ type: null, tile: null }));

export const useMahjongMelds = () => {
  const [melds, setMelds] = useState<Meld[]>(initialMelds);
  const onMeldChange = (meldIndex: number, newPartialMeld: Partial<Meld>) => {
    setMelds((currMelds) => {
      const newMelds = [...currMelds];
      newMelds[meldIndex] = { ...currMelds[meldIndex], ...newPartialMeld };

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
