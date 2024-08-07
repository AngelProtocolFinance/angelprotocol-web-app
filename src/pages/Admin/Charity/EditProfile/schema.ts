import type { ImgLink } from "components/ImgEditor";
import { MAX_SDGS } from "constants/unsdgs";
import { genFileSchema } from "schemas/file";
import { optionType, richTextContent } from "schemas/shape";
import { url, alphanumeric, requiredString, segment } from "schemas/string";
import type { SchemaShape } from "schemas/types";
import type { ImageMIMEType } from "types/lists";
import { type ObjectSchema, array, object, string } from "yup";
import type { FV } from "./types";

export const VALID_MIME_TYPES: ImageMIMEType[] = [
  "image/jpeg",
  "image/png",
  "image/webp",
  "image/svg+xml",
];

export const MAX_SIZE_IN_BYTES = 1e6;
export const MAX_CHARS = 4000;

const fileObj = object<any, SchemaShape<ImgLink>>({
  file: genFileSchema(MAX_SIZE_IN_BYTES, VALID_MIME_TYPES),
});

//construct strict shape to avoid hardcoding shape keys
export const schema = object<any, SchemaShape<FV>>({
  sdgs: array()
    .min(1, "required")
    .max(MAX_SDGS, `maximum ${MAX_SDGS} selections allowed`),
  tagline: requiredString.trim().max(140, "max length is 140 chars"),
  image: fileObj,
  card_img: fileObj,
  logo: fileObj,
  url: url,
  registration_number: string().matches(
    alphanumeric,
    "must only contain numbers and letters"
  ),
  endow_designation: optionType({ required: true }),
  name: requiredString.trim(),
  active_in_countries: array(),
  social_media_urls: object().shape<SchemaShape<FV["social_media_urls"]>>({
    facebook: url,
    twitter: url,
    linkedin: url,
    discord: url,
    instagram: url,
    youtube: url,
    tiktok: url,
  }),
  overview: richTextContent({ maxChars: MAX_CHARS }),
  slug: segment.max(30, "max 30 characters"),
}) as ObjectSchema<FV>;
