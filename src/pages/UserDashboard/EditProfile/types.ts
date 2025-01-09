import { imgOutput } from "components/ImgEditor";
import * as v from "valibot";

export const schema = v.object({
  firstName: v.pipe(v.string("required"), v.nonEmpty("required")),
  lastName: v.pipe(v.string("required"), v.nonEmpty("required")),
  /** from selector */
  prefCurrency: v.object({
    code: v.string(),
    min: v.number(),
    rate: v.number(),
  }),
  avatar: imgOutput(),
});

export interface FV extends v.InferOutput<typeof schema> {}
