import type { valuesBySuit } from "./tiles";
import type {
  NumberValue,
  DragonValue,
  WindValue,
  Suit,
  MeldType,
} from "../api";
import type { miscTileSvgs } from "../assets/tiles";

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

export type MeldState = {
  type: MeldType | null;
  tile: Tile | null;
};

export type MiscTileSlug = keyof typeof miscTileSvgs;
