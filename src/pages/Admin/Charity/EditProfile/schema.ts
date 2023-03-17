import * as Yup from "yup";
import { FormValues } from "./types";
import { SchemaShape } from "schemas/types";
import { CountryOption } from "services/types";
import { ImgLink } from "components/ImgEditor";
import { genFileSchema } from "schemas/file";
import { requiredString, url } from "schemas/string";
import { MAX_SDGS } from "constants/unsdgs";

export const VALID_MIME_TYPES = [
  "image/jpeg",
  "image/png",
  "image/webp",
  "image/svg",
];

const fileObj = Yup.object().shape<SchemaShape<ImgLink>>({
  file: genFileSchema(1e6, VALID_MIME_TYPES).when("publicUrl", {
    is: (value: string) => !value,
    then: (schema) => schema.required("required"),
  }),
});

//construct strict shape to avoid hardcoding shape keys
const shape: SchemaShape<FormValues> = {
  categories_sdgs: Yup.array()
    .min(1, "required")
    .max(MAX_SDGS, `maximum ${MAX_SDGS} selections allowed`),
  tagline: requiredString.max(140, "max length is 140 chars"),
  image: fileObj,
  logo: fileObj,
  url: url.required("required"),
  // registration_number: no need to validate,
  hq_country: Yup.object().shape<SchemaShape<CountryOption>>({
    name: requiredString,
  }),
  name: requiredString,
  overview: requiredString,
  active_in_countries: Yup.array(),
  social_media_url_facebook: url,
  social_media_url_twitter: url,
  social_media_url_linkedin: url,
  social_media_url_discord: url,
  social_media_url_instagram: url,
  social_media_url_youtube: url,
  social_media_url_tiktok: url,
};

export const schema = Yup.object().shape(shape);
