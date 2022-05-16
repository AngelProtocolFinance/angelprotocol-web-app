import * as Yup from "yup";
import { testTokenDigits } from "./tests";

const tokenConstraint = Yup.number()
  .positive("invalid: must be greater than zero ")
  .typeError("invalid: must be a number")
  .test("max precision", "must not be greater than 6 digits", testTokenDigits);

const positiveNumberConstraint = Yup.number()
  .typeError("invalid: must be a number")
  .positive("invalid: must be greater than zero");

const percentConstraint = Yup.number()
  .typeError("invalid: must be a number")
  .min(0, "invalid: should not be negative")
  .max(100, "invalid: should not be greater than 100");

export const requiredTokenAmount = Yup.lazy((value) =>
  value === "" ? Yup.string().required("required") : tokenConstraint
);
export const tokenAmount = Yup.lazy((value) =>
  value === "" ? Yup.string() : tokenConstraint
);

//validate but revert back to string
export const tokenAmountString = Yup.lazy((value) =>
  value === ""
    ? Yup.string()
    : tokenConstraint.isValidSync(value)
    ? Yup.string()
    : tokenConstraint
);

export const requiredPositiveNumber = Yup.lazy((value) =>
  value === "" ? Yup.string().required("required") : positiveNumberConstraint
);
export const positiveNumber = Yup.lazy((value) =>
  value === "" ? Yup.string() : positiveNumberConstraint
);
export const percentString = Yup.lazy((value) =>
  value === ""
    ? Yup.string()
    : percentConstraint.isValidSync(value)
    ? Yup.string()
    : percentConstraint
);
