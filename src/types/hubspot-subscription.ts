import * as v from "valibot";
export const email_subs = v.object({
  email: v.pipe(
    v.string("required"),
    v.nonEmpty("required"),
    v.trim(),
    v.nonEmpty("required"),
    v.email("invalid email")
  ),
});

export interface IEmailSubs extends v.InferOutput<typeof email_subs> {}
