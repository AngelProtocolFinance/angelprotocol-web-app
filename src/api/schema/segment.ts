import * as v from "valibot";

export const segment = v.pipe(
  v.string(),
  v.trim(),
  v.nonEmpty(),
  //must not be id-like
  v.regex(/^(?!^\d+$)/, "should not be an id"),
  //valid characters
  v.regex(/^[a-zA-Z0-9-._~]+$/, "invalid segment"),
  v.excludes("..", "invalid segment"),
  v.custom((x) => !(x as string).startsWith("."), "invalid segment"),
  v.custom((x) => !(x as string).endsWith("."), "invalid segment")
);
