import { DateSchema, date, object, ref } from "yup";
import { FormValues } from "./types";
import { SchemaShape } from "schemas/types";

const now = new Date();
const endKey: keyof FormValues = "endDate";
const startKey: keyof FormValues = "startDate";

const dateSchema = date()
  .typeError("invalid")
  .max(now, "can't be later than today");

export const schema = object().shape<SchemaShape<FormValues>>({
  startDate: dateSchema.when(endKey, (end, schema: DateSchema) =>
    date().isValidSync(end)
      ? schema.max(end, "can't be later than end date")
      : schema
  ),
  endDate: dateSchema.when(startKey, (start, schema: DateSchema) =>
    date().isValidSync(start)
      ? schema.min(ref(startKey), "can't be earlier than start date")
      : schema
  ),
});
