import type { NumberValue, Suit } from "../api";
import { dragonValues, numberValues, windValues } from "./enums";
import type { SuitTile, Tile, TilesBySuit, TileSlug, TileValue } from "./types";

/** Array of all tile values */
export const tileValues: TileValue[] = [
  ...numberValues,
  ...dragonValues,
  ...windValues,
];

/** Lookup for values by suit */
export const valuesBySuit = {
  circle: numberValues,
  bamboo: numberValues,
  character: numberValues,
  dragon: dragonValues,
  wind: windValues,
} as const;

/** Util to get typed values for each suit */
const getSuitTiles = <T extends Suit>(suit: T) =>
  valuesBySuit[suit].map(
    (value): SuitTile<T> => ({
      suit,
      value,
    })
  );

/** Lookup for tiles by suit */
export const tilesBySuit: TilesBySuit = {
  circle: getSuitTiles("circle"),
  bamboo: getSuitTiles("bamboo"),
  character: getSuitTiles("character"),
  dragon: getSuitTiles("dragon"),
  wind: getSuitTiles("wind"),
};

/** Array of all tiles */
export const tiles: Tile[] = Object.values(tilesBySuit).flat();

export const getTileSlug = ({ suit, value }: Tile): TileSlug => {
  // if (suit === "wind") return `${value}-${suit}`;
  // if (suit === "dragon") return `${value}-${suit}`;
  return `${value}-${suit}` as TileSlug;
};

const lookup: Record<number, NumberValue> = {
  1: "1",
  2: "2",
  3: "3",
  4: "4",
  5: "5",
  6: "6",
  7: "7",
  8: "8",
  9: "9",
};

export const parseNumberValue = (number: number): NumberValue | null => {
  const parsedValue = lookup[number];
  if (parsedValue) return parsedValue;
  return null;
};

const isHonourLookup = {
  bamboo: false,
  character: false,
  circle: false,
  dragon: true,
  wind: true,
} as const;

export const isHonour = (suit: Suit): suit is "dragon" | "wind" =>
  isHonourLookup[suit];
