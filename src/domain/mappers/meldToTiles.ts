import { isHonour, parseNumberValue } from "../tiles";
import type { Meld, NumberedSuit, Tile } from "../types";
import type { TilePreview } from "../../components/MeldPreview/GeneralisedTile";

type PreviewedTileParams = Meld | { type: "pair"; tile: Tile | null };

const defaultTiles: TilePreview[] = [1, 2, 3].map(() => ({
  miscTileSlug: "any",
}));

const meldToTilePreviews = ({
  tile,
  type,
}: PreviewedTileParams): TilePreview[] => {
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

  const tiles: TilePreview[] = [0, 1, 2].map((increment): TilePreview => {
    const value = numberValue + increment;
    const parsedValue = parseNumberValue(value);
    if (!parsedValue) return { miscTileSlug: "error" };

    return { tile: { suit: numberedSuit, value: parsedValue } };
  });

  return tiles;
};

export default meldToTilePreviews;
