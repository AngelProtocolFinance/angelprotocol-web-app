import type { ImgLink } from "components/ImgEditor";
import { genFileSchema } from "schemas/file";
import { schema as schemaFn } from "schemas/shape";
import { requiredString } from "schemas/string";
import type { ImageMIMEType } from "types/lists";
import type { FormValues as FV } from "./types";

export const VALID_MIME_TYPES: ImageMIMEType[] = [
  "image/jpeg",
  "image/png",
  "image/webp",
  "image/svg+xml",
];

export const MAX_SIZE_IN_BYTES = 1e6;
export const MAX_CHARS = 4000;

const fileObj = schemaFn<ImgLink>({
  file: genFileSchema(MAX_SIZE_IN_BYTES, VALID_MIME_TYPES),
});

export const schema = schemaFn<FV>({
  name: requiredString,
  description: requiredString,
  banner: fileObj,
  logo: fileObj,
});