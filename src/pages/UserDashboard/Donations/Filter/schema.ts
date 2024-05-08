import type { SchemaShape } from "schemas/types";
import { type ObjectSchema, date, lazy, object, ref, string } from "yup";
import type { FormValues } from "./types";

const endKey: keyof FormValues = "endDate";
const startKey: keyof FormValues = "startDate";

const now = new Date();
const dateSchema = date()
  .typeError("invalid")
  .max(now, "can't be later than today");

export const schema = object<any, SchemaShape<FormValues>>({
  startDate: dateSchema.when(endKey, ([endDate], schema) =>
    date().isValidSync(endDate)
      ? schema.max(endDate, "can't be later than end date")
      : schema
  ),
  endDate: lazy((val) =>
    val
      ? dateSchema.when(startKey, ([startDate], schema) =>
          date().isValidSync(startDate)
            ? schema.min(ref(startKey), "can't be earlier than start date")
            : schema
        )
      : string().required("invalid").trim()
  ),
}) as ObjectSchema<FormValues>;
