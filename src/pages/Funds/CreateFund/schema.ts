import * as v from "valibot";
import { MAX_SIZE_IN_BYTES, VALID_MIME_TYPES, target } from "../common";

const str = v.pipe(v.string(), v.trim());

const fileObject = v.object({
  name: str,
  publicUrl: v.pipe(str, v.url()),
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

export const schema = v.object({
  name: v.pipe(str, v.nonEmpty("required")),
  description: v.pipe(str, v.nonEmpty("required")),
  banner: imgLink,
  logo: imgLink,
  members: v.pipe(
    v.array(endowOption),
    v.minLength(1, "must contain at least one endowment")
  ),
  featured: v.boolean(),
  settings,
  expiration: v.optional(
    v.lazy((val) => {
      if (!val) return v.string();
      return v.pipe(
        v.string(),
        v.transform((val) => val && new Date(val).toISOString()),
        v.isoTimestamp("invalid date"),
        v.minValue(new Date().toISOString(), "must be in the future")
      );
    })
  ),
  target,
});

export interface FundMember extends v.InferOutput<typeof endowOption> {}
export interface EndowOption extends FundMember {}
export type FV = v.InferOutput<typeof schema>;
