import { DateSchema, date, lazy, object, ref, string } from "yup";
import { FormValues } from "./types";
import { SchemaShape } from "schemas/types";

const endKey: keyof FormValues = "endDate";
const startKey: keyof FormValues = "startDate";

const now = new Date();
const dateSchema = date()
  .typeError("invalid")
  .max(now, "can't be later than today");

export const schema = object().shape<SchemaShape<FormValues>>({
  startDate: dateSchema.when(endKey, (end, schema: DateSchema) =>
    date().isValidSync(end)
      ? schema.max(end, "can't be later than end date")
      : schema
  ),
  endDate: lazy((val) =>
    val
      ? dateSchema.when(startKey, (start, schema: DateSchema) =>
          date().isValidSync(start)
            ? schema.min(ref(startKey), "can't be earlier than start date")
            : schema
        )
      : string().required("invalid")
  ),
});
