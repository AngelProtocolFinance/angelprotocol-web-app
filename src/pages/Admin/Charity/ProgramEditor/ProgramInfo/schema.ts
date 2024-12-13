import { imgOutput } from "components/ImgEditor";
import * as v from "valibot";
import { MAX_CHARS } from "../common";

const requiredStr = v.pipe(v.string("required"), v.nonEmpty("required"));
export const schema = v.object({
  title: requiredStr,
  description: v.object({
    value: requiredStr,
    length: v.optional(
      v.pipe(
        v.number(),
        v.maxValue(MAX_CHARS, (x) => `max ${x.requirement} characters`)
      )
    ),
  }),
  image: imgOutput({ required: false }),
  targetRaise: v.lazy((val) => {
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
