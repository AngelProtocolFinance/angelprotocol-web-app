import { new_password } from "schemas/string";
import * as v from "valibot";
export const email_schema = v.object({
  email: v.pipe(
    v.string("required"),
    v.nonEmpty("required"),
    v.email("invalid")
  ),
});

export interface IEmailSchema extends v.InferOutput<typeof email_schema> {}

const password_schema_raw = v.object({
  otp: v.pipe(
    v.string("required"),
    v.nonEmpty("required"),
    v.digits("invalid code"),
    v.length(6, "invalid code")
  ),
  password: new_password,
  password_confirmation: v.pipe(v.string("required"), v.nonEmpty("required")),
});

export const password_schema = v.pipe(
  password_schema_raw,
  v.forward(
    v.partialCheck(
      [["password"], ["password_confirmation"]],
      (input) => {
        return input.password === input.password_confirmation;
      },
      "password mismatch"
    ),
    ["password_confirmation"]
  )
);

export interface IPasswordSchema
  extends v.InferOutput<typeof password_schema_raw> {}
