import * as Yup from "yup";

export const schema = Yup.object().shape({
  startDate: Yup.date()
    .transform((curr, orig) => (orig === "" ? null : curr))
    .nullable(true)
    .min("2018-12-31", "Date is too early")
    .max(new Date())
    .default(new Date())
    .notRequired(),
  endDate: Yup.date()
    .transform((curr, orig) => (orig === "" ? null : curr))
    .nullable(true)
    .when("startDate", {
      is: (startDateVal: Date | null) => startDateVal !== null,
      then: Yup.date().min(
        Yup.ref("startDate"),
        "End date must be after start date"
      ),
    })
    .max(new Date())
    .default(new Date()),
});
