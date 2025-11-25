import { $, $req } from "@better-giving/schemas";
import * as v from "valibot";

export const schema = v.object({
  tag: $,
  /** selector */
  program: v.union([$, v.pipe($, v.uuid("internal: invalid program id"))]),
});

export interface FV extends v.InferOutput<typeof schema> {}
