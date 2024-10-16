import * as v from "valibot";
import { MAX_SIZE_IN_BYTES, VALID_MIME_TYPES, target } from "../common";

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

export const schema = v.object({
  name: v.pipe(str, v.nonEmpty("required")),
  description: v.pipe(str, v.nonEmpty("required")),
  target,
  banner: imgLink,
  logo: imgLink,
});

export type FV = v.InferOutput<typeof schema>;
