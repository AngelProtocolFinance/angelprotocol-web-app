import { ImgLink } from "@/components/ImgEditor";
import { SchemaShape, genFileSchema, requiredString, url } from "@ap/schemas";
import * as Yup from "yup";
import { FormValues } from "./types";
import { CountryOption } from "@/services/types";

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
  categories_sdgs: Yup.array().min(1, "required"),
  tagline: requiredString,
  image: fileObj,
  logo: fileObj,
  url: url.required("required"),
  // registration_number: no need to validate,
  hq_country: Yup.object().shape<SchemaShape<CountryOption>>({
    name: requiredString,
  }),
  name: requiredString,
  overview: requiredString,
  active_in_countries: Yup.array().min(1, "required"),
  social_media_url_facebook: url,
  social_media_url_twitter: url,
  social_media_url_linkedin: url,
  social_media_url_discord: url,
  social_media_url_instagram: url,
  social_media_url_youtube: url,
  social_media_url_tiktok: url,
};

export const schema = Yup.object().shape(shape);
