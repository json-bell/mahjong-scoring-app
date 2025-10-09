import type { valuesBySuit } from "./tiles";
import type { NumberValue, DragonValue, WindValue, Suit } from "../api";

export type NumberedSuit = Extract<Suit, "circle" | "bamboo" | "character">;

export type TileValue = NumberValue | DragonValue | WindValue;

export type Tile =
  | { value: NumberValue; suit: NumberedSuit }
  | { value: DragonValue; suit: `dragon` }
  | { value: WindValue; suit: `wind` };

export type SuitTile<T extends Suit> = {
  suit: T;
  value: (typeof valuesBySuit)[T][number];
};

export type TilesBySuit = {
  [T in Suit]: SuitTile<T>[];
};

export type TileSlug =
  | `${NumberValue}-${NumberedSuit}`
  | `${DragonValue}-dragon`
  | `${WindValue}-wind`;
