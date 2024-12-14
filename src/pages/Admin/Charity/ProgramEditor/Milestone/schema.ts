import { imgOutput } from "components/ImgEditor";
import * as v from "valibot";
import { MAX_CHARS } from "../common";

const requiredStr = v.pipe(v.string("required"), v.nonEmpty("required"));
export const schema = v.object({
  date: v.pipe(
    v.string(),
    v.transform((x) => new Date(x)),
    v.date("invalid date"),
    v.transform((x) => x.toISOString())
  ),
  description: v.object({
    value: requiredStr,
    length: v.optional(
      v.pipe(
        v.number(),
        v.maxValue(MAX_CHARS, (x) => `max ${x.requirement} characters`)
      )
    ),
  }),
  title: requiredStr,
  media: imgOutput(),
});

export interface FV extends v.InferOutput<typeof schema> {}
