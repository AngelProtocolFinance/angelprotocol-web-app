import * as v from "valibot";
export const emailSubs = v.object({
  email: v.pipe(
    v.string("required"),
    v.nonEmpty("required"),
    v.trim(),
    v.nonEmpty("required"),
    v.email("invalid email")
  ),
});
