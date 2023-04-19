import * as Yup from "yup";
import { testTokenDigits } from "./tests";

export const tokenConstraint = Yup.number()
  .positive("invalid: must be greater than zero ")
  .typeError("invalid: must be a number")
  .test("max precision", "must not be greater than 6 digits", testTokenDigits);

export const positiveNumberConstraint = Yup.number()
  .typeError("invalid: must be a number")
  //.positive treats 0 as negative
  .positive("must be more than 0");

export const percentConstraint = Yup.number()
  .typeError("invalid: must be a number")
  .positive("must be more than 0")
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

function lazyNumber(constraint: any, isRequired?: true) {
  return Yup.lazy((value) => {
    if (value === "") {
      return isRequired ? Yup.string().required("required") : Yup.string();
      //number fields treated as number
    } else if (isNaN(value)) {
      return isRequired
        ? Yup.number(/** where "" resolves to NaN */).typeError("required")
        : Yup.mixed();
    } else {
      return constraint;
    }
  });
}

export const requiredPositiveNumber = lazyNumber(
  positiveNumberConstraint,
  true
);
export const positiveNumber = lazyNumber(positiveNumberConstraint);

export const percentString = lazyNumber(percentConstraint);
export const requiredPercent = lazyNumber(percentConstraint, true);
