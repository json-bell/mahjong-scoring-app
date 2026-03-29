import type { TileSchema } from "../../api";
import { valuesBySuit } from "../tiles";
import type { Tile, TileValue } from "../types";

const isTileSchemaValid = (schema: TileSchema): schema is Tile => {
  const allowedValues: TileValue[] = valuesBySuit[schema.suit];
  return allowedValues.includes(schema.value);
};

export const tileFromSchema = (schema: TileSchema): Tile => {
  if (isTileSchemaValid(schema)) return schema;
  throw new Error(`Tried to make tile from schema: ${JSON.stringify(schema)}`);
};
