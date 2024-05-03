import { MAX_SDGS } from "constants/unsdgs";
import { optionType } from "schemas/shape";
import { url, requiredString } from "schemas/string";
import type { SchemaShape } from "schemas/types";
import type { Country } from "types/components";
import { type ObjectSchema, array, object } from "yup";
import type { FormValues } from "./types";

export const schema = object<any, SchemaShape<FormValues>>({
  Website: url.required("required"),
  UN_SDG: array()
    .min(1, "required")
    .max(MAX_SDGS, `maximum ${MAX_SDGS} selections allowed`),
  HqCountry: object<any, SchemaShape<Country>>({
    name: requiredString.trim(),
  }),
  EndowDesignation: optionType({ required: true }),
}) as ObjectSchema<FormValues>;
