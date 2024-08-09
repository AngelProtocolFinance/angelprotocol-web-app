import { stringNumber } from "schemas/shape";
import type { SchemaShape } from "schemas/types";
import type { TDonateMethod } from "types/components";
import { type ObjectSchema, array, number, object, string } from "yup";
import type { FormValues } from "./types";

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
  title: string().max(100),
  description: string().max(300),
  increments: array()
    .of(
      object({
        value: stringNumber(
          (s) => s.required("required"),
          (n) => n.positive("must be greater than 0")
        ),
      })
    )
    .max(4, "up to 4 preset values only"),
}) as ObjectSchema<FormValues>;
