import * as Yup from "yup";
import { testTokenDigits } from "./tests";

export const tokenConstraint = Yup.number()
  .positive("invalid: must be greater than zero ")
  .typeError("invalid: must be a number")
  .test("max precision", "must not be greater than 6 digits", testTokenDigits);
