import type { HandSchemaOutput } from "../api";
import { tileFromSchema } from "./mappers/mappers";
import type { Meld, Tile } from "./types";
import type { TilePreview } from "../components/MeldPreview/GeneralisedTile";
import meldToTilePreviews from "./mappers/meldToTiles";

export class Hand {
  melds: Meld[];
  pair: Tile | null;
  constructor(melds: Meld[], pair: Tile | null) {
    this.melds = melds;
    this.pair = pair;
  }

  tilePreviews(): TilePreview[] {
    const tiles = [...this.melds, { type: "pair" as const, tile: this.pair }]
      .map(meldToTilePreviews)
      .flat();

    return tiles;
  }

  static fromSchema(schema: HandSchemaOutput): Hand {
    const pair = tileFromSchema(schema.pair);
    const melds = schema.melds.map(({ tile: tileSchema, type }): Meld => {
      const tile = tileFromSchema(tileSchema);
      return { tile, type };
    });

    return new Hand(melds, pair);
  }
}
