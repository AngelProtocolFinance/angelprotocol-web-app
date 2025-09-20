import { target } from "components/goal-selector";
import { img_output } from "components/img-editor";
import { richTextContent } from "types/components";
import * as v from "valibot";
import { video } from "../common/videos";

const str = v.pipe(v.string("required"), v.trim());

export const endow_opt = v.object({
  id: v.number(),
  name: str,
  logo: v.optional(v.pipe(str, v.url())),
});

export const MAX_DESCRIPTION_CHAR = 3000;

export const schema = v.object({
  name: v.pipe(str, v.nonEmpty("required")),
  description: richTextContent({
    maxChars: MAX_DESCRIPTION_CHAR,
    required: true,
  }),
  banner: img_output({ required: true }),
  logo: img_output({ required: true }),
  members: v.pipe(
    v.array(endow_opt),
    v.minLength(1, "must contain at least one nonprofit"),
    v.maxLength(10, "cannot contain more than 10 nonprofits")
  ),
  expiration: v.optional(
    v.lazy((val) => {
      if (!val) return v.string();
      return v.pipe(
        str,
        v.transform((val) => new Date(val)),
        v.date("invalid date"),
        v.minValue(new Date(), "must be in the future"),
        v.transform((val) => val.toISOString())
      );
    })
  ),
  target,
  videos: v.array(video),
});

export interface FundMember extends v.InferOutput<typeof endow_opt> {}
export interface EndowOption extends FundMember {}
export interface FV extends v.InferOutput<typeof schema> {}
