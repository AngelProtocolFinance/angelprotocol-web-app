import { MAX_SDGS } from "constants/unsdgs";
import { optionType } from "schemas/shape";
import { url, requiredString } from "schemas/string";
import type { SchemaShape } from "schemas/types";
import type { Country } from "types/components";
import { type ObjectSchema, array, object } from "yup";
import type { FormValues } from "./types";

export const schema = object<any, SchemaShape<FormValues>>({
  website: url.required("required"),
  un_sdg: array()
    .min(1, "required")
    .max(MAX_SDGS, `maximum ${MAX_SDGS} selections allowed`),
  hq_country: object<any, SchemaShape<Country>>({
    name: requiredString.trim(),
  }),
  designation: optionType({ required: true }),
}) as ObjectSchema<FormValues>;
