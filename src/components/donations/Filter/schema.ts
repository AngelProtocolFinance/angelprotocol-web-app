import * as Yup from "yup";

export const schema = (date1: Date | string) =>
  Yup.object().shape({
    startDate: Yup.date()
      .min("2018-12-31", "Date is too early")
      .max(new Date()),
    endDate: Yup.date().min(date1).max(new Date()),
  });
