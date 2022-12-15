import * as Yup from "yup";

export const schema = (date1: Date | null | string) =>
  Yup.object().shape({
    startDate: Yup.date()
      .transform((curr, orig) => (orig === "" ? null : curr))
      .nullable(true)
      .min("2018-12-31", "Date is too early")
      .max(new Date())
      .default(new Date()),
    endDate: Yup.date()
      .transform((curr, orig) => (orig === "" ? null : curr))
      .nullable(true)
      .min(date1 || new Date())
      .max(new Date())
      .default(new Date()),
  });
