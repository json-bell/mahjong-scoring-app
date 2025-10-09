import type { Suit } from "../api";
import { dragonValues, numberValues, windValues } from "./enums";
import type { SuitTile, Tile, TilesBySuit, TileValue } from "./types";

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
