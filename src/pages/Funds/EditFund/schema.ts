import { imgOutput } from "components/ImgEditor";
import { richTextContent } from "types/components";
import * as v from "valibot";
import { target } from "../common";
import { video } from "../common/videos";

const str = v.pipe(v.string(), v.trim());

export const MAX_DESCRIPTION_CHARS = 500;
export const schema = v.object({
  name: v.pipe(str, v.nonEmpty("required")),
  description: richTextContent({
    maxChars: MAX_DESCRIPTION_CHARS,
    required: true,
  }),
  target,
  videos: v.array(video),
  banner: imgOutput({ required: true }),
  logo: imgOutput({ required: true }),
});

export type FV = v.InferOutput<typeof schema>;
