import * as v from "valibot";
import * as Yup from "yup";

export const alphanumeric = /^[0-9a-zA-Z]+$/;

export const requiredString = Yup.string().required("required");

export const url = Yup.string()
  .trim()
  /** though our validation library also supports http and ftp,
   * Our use case is fairly limited to user giving us links to their social media or website
   * which is widespread to be on https.
   *
   * Moreover, we are expecting donors to click these links.
   *  */
  .transform((str?: string) => (str || "").replace(/^(http|ftp):\/\//, "_")) //send an invalid value to parser
  .url(({ value }) => {
    //only check for https as http and ftp are filtered out
    if (!/^https:\/\//.test(value)) return "should start with https://";
    if (value === "https://") return "incomplete url";
    return "invalid url";
  });

export const segment = Yup.string()
  .trim()
  .test("not-id", "should not be an id", (v) =>
    v ? /^(?!^\d+$)/.test(v) : true
  )
  .test("valid-char", "invalid segment", (v) =>
    v ? /^[a-zA-Z0-9-._~]+$/.test(v) : true
  )
  .test("no double period", "invalid segment", (v) => !v?.includes(".."))
  .test(
    "no-starting-ending-period",
    "invalid segment",
    (v) => !v?.startsWith(".") && !v?.endsWith(".")
  );

export const password = requiredString
  .min(8, ({ min }) => `must have at least ${min} characters`)
  .matches(/[a-z]/, "must have lowercase letters")
  .matches(/[A-Z]/, "must have uppercase letters")
  .matches(/\d/, "must have numbers")
  .matches(/[!@#$%^&*()_+{}\[\]:;<>,.?~\\/-]/, "must have special characters");

export const newPassword = v.pipe(
  v.string("required"),
  v.nonEmpty("required"),
  v.minLength(8, "must have at least 8 characters"),
  v.regex(/[a-z]/, "must have lowercase letters"),
  v.regex(/[A-Z]/, "must have uppercase letters"),
  v.regex(/\d/, "must have numbers"),
  v.regex(/[!@#$%^&*()_+{}\[\]:;<>,.?~\\/-]/, "must have special characters")
);
