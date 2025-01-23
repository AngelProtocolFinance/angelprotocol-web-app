import { newPassword } from "schemas/string";
import * as v from "valibot";
export const emailSchema = v.object({
  email: v.pipe(
    v.string("required"),
    v.nonEmpty("required"),
    v.email("invalid")
  ),
});

export const passwordSchema = v.pipe(
  v.object({
    otp: v.pipe(
      v.string("required"),
      v.nonEmpty("required"),
      v.digits("invalid code"),
      v.length(6, "invalid code")
    ),
    password: newPassword,
    passwordConfirmation: v.pipe(v.string("required"), v.nonEmpty("required")),
  }),
  v.forward(
    v.partialCheck(
      [["password"], ["passwordConfirmation"]],
      (input) => {
        return input.password === input.passwordConfirmation;
      },
      "password mismatch"
    ),
    ["passwordConfirmation"]
  )
);
