import type { SchemaShape } from "schemas/types";
import { type ObjectSchema, number, object, array } from "yup";
import type { FormValues } from "./types";
import { Method } from "types/widget";

export const schema = object<any, SchemaShape<FormValues>>({
  endowment: object<any, SchemaShape<FormValues["endowment"]>>({
    id: number().notOneOf([0], "required"),
  }),
  methods: array().test(
    "",
    "at least one method should be active",
    (values) => {
      return values?.some((v) => !(v as Method).disabled);
    }
  ),
}) as ObjectSchema<FormValues>;
