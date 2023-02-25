import * as Yup from "yup";

const futureDateConstraint = Yup.date()
  .typeError("invalid date")
  .min(new Date(), "invalid: should be in the future");

export const futureDate = Yup.lazy((value) =>
  value === "" ? Yup.string() : futureDateConstraint
);
