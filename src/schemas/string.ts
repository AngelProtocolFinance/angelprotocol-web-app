import * as v from "valibot";
import * as Yup from "yup";

export const alphanumeric = /^[0-9a-zA-Z]+$/;
export const requiredString = Yup.string().required("required");
export const new_password = v.pipe(
  v.string("required"),
  v.nonEmpty("required"),
  v.minLength(8, "must have at least 8 characters"),
  v.regex(/[a-z]/, "must have lowercase letters"),
  v.regex(/[A-Z]/, "must have uppercase letters"),
  v.regex(/\d/, "must have numbers"),
  v.regex(/[!@#$%^&*()_+{}\[\]:;<>,.?~\\/-]/, "must have special characters")
);
