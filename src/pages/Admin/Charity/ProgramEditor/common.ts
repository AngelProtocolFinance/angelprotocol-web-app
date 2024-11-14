import type { ImgLink } from "components/ImgEditor";
import { genFileSchema } from "schemas/file";
import type { SchemaShape } from "schemas/types";
import type { ImageMIMEType } from "types/lists";
import { object } from "yup";

export const VALID_MIME_TYPES: ImageMIMEType[] = [
  "image/jpeg",
  "image/png",
  "image/webp",
  "image/svg+xml",
];

export const MAX_SIZE_IN_BYTES = 1e6;
export const MAX_CHARS = 500;

export const fileObj = object().shape<SchemaShape<ImgLink>>({
  file: genFileSchema(MAX_SIZE_IN_BYTES, VALID_MIME_TYPES),
});
