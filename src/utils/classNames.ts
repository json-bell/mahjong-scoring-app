/** Combines strings & falsy values to make a well-defined className */
export const cx = (...args: (string | false | null | undefined)[]): string => {
  return args.filter((val) => val).join(" ");
};
