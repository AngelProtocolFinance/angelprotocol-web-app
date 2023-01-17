import * as Yup from "yup";
import { FormValues } from "./types";

const now = new Date();
const endKey: keyof FormValues = "endDate";
export const schema = Yup.object().shape({
  startDate: Yup.date()
    .typeError("invalid date")
    .when(endKey, (end, schema: Yup.DateSchema) =>
      Yup.date().isValidSync(end)
        ? schema.max(end, "later than end date")
        : schema.max(now, "later than present")
    ),
  endDate: Yup.date().typeError("invalid date").max(now, "later than present"),
});
