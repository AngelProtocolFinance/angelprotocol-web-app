import { DateSchema, date, lazy, object, ref, string } from "yup";
import { FormValues } from "./types";
import { SchemaShape } from "schemas/types";

const now = new Date();
const endKey: keyof FormValues = "endDate";
const startKey: keyof FormValues = "startDate";
export const schema = object().shape<SchemaShape<FormValues>>({
  startDate: lazy((val) =>
    val
      ? date()
          .max(now, "can't be later than today")
          .when(endKey, (end, schema: DateSchema) =>
            date().isValidSync(end)
              ? schema.max(end, "can't be later than end date")
              : schema
          )
      : string().required("invalid")
  ),
  endDate: lazy((val) =>
    val
      ? date()
          .max(now, "can't be later than today")
          .when(startKey, (start, schema: DateSchema) =>
            date().isValidSync(start)
              ? schema.min(ref(startKey), "can't be earlier than start date")
              : schema
          )
      : string().required("invalid")
  ),
});
