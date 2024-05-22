import type { SchemaShape } from "schemas/types";
import { type ObjectSchema, array, number, object } from "yup";
import type { FormValues } from "./types";
import { TDonateMethod } from "types/components";

export const schema = object<any, SchemaShape<FormValues>>({
  endowment: object<any, SchemaShape<FormValues["endowment"]>>({
    id: number().notOneOf([0], "required"),
  }),
  methods: array().test(
    "",
    "at least one payment option should be active",
    (values) => {
      return values?.some((v) => !(v as TDonateMethod).disabled);
    }
  ),
}) as ObjectSchema<FormValues>;
