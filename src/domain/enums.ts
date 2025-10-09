/**
 * This file defines literal `as const` arrays for OpenAPI-generated enums/unions,
 * along with compile-time checks to ensure the literals match the generated types exactly.
 *
 * Each enum follows a two-part pattern:
 * 1. `Const` arrays (top section) – literal values + compile-time type check.
 * 2. Exported arrays (bottom section) – simple `TEnum[]` arrays for easy runtime usage.
 *
 * This ensures:
 * - Generated type ⊆ literal array (no missing values)
 * - Literal array ⊆ generated type (no extra values)
 * - Fully ergonomic usage (`.map`, `.includes`, etc.)
 *
 * Naming conventions:
 * - `FooConst` → literal `as const` array
 * - `Foo` → exported array of type `FooEnum[]`
 * - Type-check utility: `ArrayMatches<TLiterals, TEnum>`
 */

import type {
  DragonValue,
  MeldType,
  NumberValue,
  Suit,
  WindValue,
} from "../api";
import type { Assert, CheckEqual } from "./static-type-checks";
import type { NumberedSuit } from "./types";

// --------------------
//  CONST-TYPED ARRAYS
// --------------------
/* eslint @typescript-eslint/no-unused-vars: ["error", { "varsIgnorePattern": "^_"  }]*/

const meldTypesConst = ["chow", "pong", "kong"] as const;
// @ts-expect-error TS6196: type intentionally unused
type _MeldCheck = Assert<CheckEqual<MeldType, (typeof meldTypesConst)[number]>>;

const suitsConst = ["circle", "bamboo", "character", "wind", "dragon"] as const;
// @ts-expect-error TS6196: type intentionally unused
type _SuitCheck = Assert<CheckEqual<Suit, (typeof suitsConst)[number]>>;

const numberValuesConst = [
  "1",
  "2",
  "3",
  "4",
  "5",
  "6",
  "7",
  "8",
  "9",
] as const;
// @ts-expect-error TS6196: type intentionally unused
type _NumberCheck = Assert<
  CheckEqual<NumberValue, (typeof numberValuesConst)[number]>
>;

const dragonValuesConst = ["red", "green", "white"] as const;
// @ts-expect-error TS6196: type intentionally unused
type _DragonCheck = Assert<
  CheckEqual<DragonValue, (typeof dragonValuesConst)[number]>
>;

const windValuesConst = ["east", "south", "west", "north"] as const;
// @ts-expect-error TS6196: type intentionally unused
type _WindCheck = Assert<
  CheckEqual<WindValue, (typeof windValuesConst)[number]>
>;

// -------------------
//  ENUM TYPED ARRAYS
// -------------------

export const meldTypes: MeldType[] = [...meldTypesConst];
export const suits: Suit[] = [...suitsConst];
export const numberValues: NumberValue[] = [...numberValuesConst];
export const dragonValues: DragonValue[] = [...dragonValuesConst];
export const windValues: WindValue[] = [...windValuesConst];

// Enum subsets

export const numberedSuits: NumberedSuit[] = ["circle", "bamboo", "character"];
