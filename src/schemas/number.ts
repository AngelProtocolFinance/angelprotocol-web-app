import * as Yup from "yup";
import { testTokenDigits } from "./tests";

export const tokenConstraint = Yup.number()
  .positive("invalid: must be greater than zero ")
  .typeError("invalid: must be a number")
  .test("max precision", "must not be greater than 6 digits", testTokenDigits);

const percentConstraint = Yup.number()
  .typeError("invalid: must be a number")
  .positive("must be more than 0")
  .max(100, "invalid: should not be greater than 100");

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

export const requiredPercent = lazyNumber(percentConstraint, true);
