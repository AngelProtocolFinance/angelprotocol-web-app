import { ObjectSchema, array, object } from "yup";
import { FormValues as FV } from "./types";
import { SchemaShape } from "schemas/types";
import { Country } from "types/countries";
import { ImgLink } from "components/ImgEditor";
import { OptionType } from "components/Selector";
import { genFileSchema } from "schemas/file";
import { requiredString, url } from "schemas/string";
import { MAX_SDGS } from "constants/unsdgs";

export const VALID_MIME_TYPES = [
  "image/jpeg",
  "image/png",
  "image/webp",
  "image/svg",
];

export const MAX_SIZE_IN_BYTES = 1e6;

// we only need to validate the pre-crop image and if we confirm it is valid
// we can be sure that the cropped image is valid too
const fileObj = object<any, SchemaShape<ImgLink>>({
  precropFile: genFileSchema(MAX_SIZE_IN_BYTES, VALID_MIME_TYPES).when(
    "publicUrl",
    {
      is: (value: string) => !value,
      then: (schema) => schema.required("required"),
    }
  ),
});

//construct strict shape to avoid hardcoding shape keys

export const schema = object<any, SchemaShape<FV>>({
  categories_sdgs: array()
    .min(1, "required")
    .max(MAX_SDGS, `maximum ${MAX_SDGS} selections allowed`),
  tagline: requiredString.max(140, "max length is 140 chars"),
  image: fileObj,
  logo: fileObj,
  url: url.required("required"),
  // registration_number: no need to validate,
  hq_country: object<any, SchemaShape<Country>>({
    name: requiredString,
  }),
  endow_designation: object<any, SchemaShape<OptionType<string>>>({
    label: requiredString,
    value: requiredString,
  }),
  name: requiredString,
  overview: requiredString,
  active_in_countries: array(),
  social_media_url_facebook: url,
  social_media_url_twitter: url,
  social_media_url_linkedin: url,
  social_media_url_discord: url,
  social_media_url_instagram: url,
  social_media_url_youtube: url,
  social_media_url_tiktok: url,
}) as ObjectSchema<FV>;
