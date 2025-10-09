/** Evaluates to `true` if the types are equal, and `false` otherwise */
export type CheckEqual<TypeA, TypeB> = [TypeA] extends [TypeB]
  ? [TypeB] extends [TypeA]
    ? true
    : false
  : false;

/** Throws a compile-time error if the type argument is not false
 *
 * Used with CheckEqual check the types are the same,
 * used in `enum.ts` to check an array's elements
 * exactly match a type
 */
export type Assert<T extends true> = T;
