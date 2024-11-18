import { richTextContent } from "types/components";
import * as v from "valibot";
import { MAX_SIZE_IN_BYTES, VALID_MIME_TYPES, target } from "../common";

const str = v.pipe(v.string(), v.trim());

/** not set by user */
const fileObject = v.object({
  name: str,
  publicUrl: str,
});

export const imgLink = v.object({
  file: v.pipe(
    v.file("required"),
    v.mimeType(VALID_MIME_TYPES, "invalid type"),
    v.maxSize(MAX_SIZE_IN_BYTES, "exceeds size limit")
  ),
  preview: v.pipe(str, v.url()),
  ...fileObject.entries,
});

export const endowOption = v.object({
  id: v.number(),
  name: str,
  logo: v.optional(v.pipe(str, v.url())),
});

export const settings = v.object({
  from: str,
  allowBgTip: v.boolean(),
});

export const MAX_DESCRIPTION_CHAR = 500;

export const schema = v.object({
  name: v.pipe(str, v.nonEmpty("required")),
  description: richTextContent({
    maxChars: MAX_DESCRIPTION_CHAR,
    required: true,
  }),
  banner: imgLink,
  logo: imgLink,
  members: v.pipe(
    v.array(endowOption),
    v.minLength(1, "must contain at least one endowment"),
    v.maxLength(10, "cannot contain more than 10 endowments")
  ),
  featured: v.boolean(),
  settings,
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
});

export interface FundMember extends v.InferOutput<typeof endowOption> {}
export interface EndowOption extends FundMember {}
export type FV = v.InferOutput<typeof schema>;
