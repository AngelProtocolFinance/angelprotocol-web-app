import { $req } from "@better-giving/schemas";
import { img_output } from "components/img-editor";
import * as v from "valibot";
import { MAX_CHARS } from "../common";

export const schema = v.object({
  title: $req,
  description: v.object({
    value: $req,
    length: v.optional(
      v.pipe(
        v.number(),
        v.maxValue(MAX_CHARS, (x) => `max ${x.requirement} characters`)
      )
    ),
  }),
  image: img_output(),
  target_raise: v.lazy((val) => {
    if (val === "") return v.string();
    return v.pipe(
      v.string(),
      v.transform((x) => +x),
      v.check((x) => x > 0, "must be greater than 0"),
      v.transform((x) => x.toString())
    );
  }),
});

export interface FV extends v.InferOutput<typeof schema> {}
