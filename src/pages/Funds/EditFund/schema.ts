import { richTextContent } from "types/components";
import * as v from "valibot";
import { MAX_SIZE_IN_BYTES, VALID_MIME_TYPES, target } from "../common";
import { video } from "../common/videos";

const str = v.pipe(v.string(), v.trim());

/** not set by user */
const fileObject = v.object({
  name: str,
  publicUrl: str,
});

export const imgLink = v.object({
  file: v.optional(
    v.pipe(
      v.file("required"),
      v.mimeType(VALID_MIME_TYPES, "invalid type"),
      v.maxSize(MAX_SIZE_IN_BYTES, "exceeds size limit")
    )
  ),
  preview: v.pipe(str, v.url()),
  ...fileObject.entries,
});

export const MAX_DESCRIPTION_CHARS = 500;
export const schema = v.object({
  name: v.pipe(str, v.nonEmpty("required")),
  description: richTextContent({
    maxChars: MAX_DESCRIPTION_CHARS,
    required: true,
  }),
  target,
  videos: v.array(video),
  banner: imgLink,
  logo: imgLink,
});

export type FV = v.InferOutput<typeof schema>;
