import * as Yup from "yup";

export const schema = Yup.object().shape({
  startDate: Yup.date()
    .transform((curr, orig) => (orig === "" ? null : curr))
    .nullable(true)
    .min("2018-12-31", "Start date should start from 31st December 2018")
    .max(new Date(), "Start date must be before today")
    .default(null)
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
    .max(new Date(), "End date must be before today")
    .default(null),
});
