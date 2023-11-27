import { ObjectSchema, array, object } from "yup";
import { FV } from "./types";
import { SchemaShape } from "schemas/types";
import { ImgLink } from "components/ImgEditor";
import { MIMEType, genFileSchema } from "schemas/file";
import { optionType } from "schemas/shape";
import { requiredString, url } from "schemas/string";
import { MAX_SDGS } from "constant/unsdgs";

export const VALID_MIME_TYPES: MIMEType[] = ["JPEG", "PNG", "WEBP", "SVG"];

export const MAX_SIZE_IN_BYTES = 1e6;

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
  // registration_number: no need to validate,
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
}) as ObjectSchema<FV>;
