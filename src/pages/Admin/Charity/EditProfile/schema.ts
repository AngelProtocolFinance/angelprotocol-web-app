import { ObjectSchema, array, object, string } from "yup";
import { FV } from "./types";
import { SchemaShape } from "schemas/types";
import { ImageMIMEType } from "types/lists";
import { ImgLink } from "components/ImgEditor";
import { genFileSchema } from "schemas/file";
import { optionType, richTextContent } from "schemas/shape";
import { alphanumeric, requiredString, url } from "schemas/string";
import { MAX_SDGS } from "constants/unsdgs";

export const VALID_MIME_TYPES: ImageMIMEType[] = [
  "image/jpeg",
  "image/png",
  "image/webp",
  "image/svg+xml",
];

export const MAX_SIZE_IN_BYTES = 1e6;
export const MAX_CHARS = 4000;

// we only need to validate the pre-crop image and if we confirm it is valid
// we can be sure that the cropped image is valid too
const fileObj = object<any, SchemaShape<ImgLink>>({
  precropFile: genFileSchema(MAX_SIZE_IN_BYTES, VALID_MIME_TYPES),
});

//construct strict shape to avoid hardcoding shape keys
export const schema = object<any, SchemaShape<FV>>({
  sdgs: array()
    .min(1, "required")
    .max(MAX_SDGS, `maximum ${MAX_SDGS} selections allowed`),
  tagline: requiredString.max(140, "max length is 140 chars"),
  image: fileObj,
  logo: fileObj,
  url: url,
  registration_number: string().matches(
    alphanumeric,
    "must only contain numbers and letters"
  ),
  endow_designation: optionType({ required: true }),
  name: requiredString,
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
}) as ObjectSchema<FV>;
