import * as Yup from "yup";
import { array, object, string } from "yup";
import { FormValues } from "./types";
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
const fileObj = object().shape<SchemaShape<ImgLink>>({
  precropFile: genFileSchema(MAX_SIZE_IN_BYTES, VALID_MIME_TYPES),
});

//construct strict shape to avoid hardcoding shape keys
const shape: SchemaShape<FormValues> = {
  //not required for ASTs
  categories_sdgs: array()
    .max(MAX_SDGS, `maximum ${MAX_SDGS} selections allowed`)
    .when("$isEndow", {
      is: true,
      then: (schema) => schema.min(1, "required"),
    }),
  tagline: requiredString.max(140, "max length is 140 chars"),
  image: fileObj,
  logo: fileObj,
  url: url,
  // registration_number: no need to validate,
  hq_country: object().shape<SchemaShape<Country>>({
    name: requiredString,
  }),
  endow_designation: object().shape<SchemaShape<OptionType<string>>>({
    label: string().when("$isEndow", {
      is: true,
      then: requiredString,
    }),
    value: string().when("$isEndow", {
      is: true,
      then: requiredString,
    }),
  }),
  name: requiredString,
  overview: Yup.string(),
  active_in_countries: array(),
  social_media_url_facebook: url,
  social_media_url_twitter: url,
  social_media_url_linkedin: url,
  social_media_url_discord: url,
  social_media_url_instagram: url,
  social_media_url_youtube: url,
  social_media_url_tiktok: url,
};

export const schema = object().shape(shape);
