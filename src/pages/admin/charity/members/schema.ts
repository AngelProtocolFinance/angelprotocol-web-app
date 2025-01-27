import * as v from "valibot";
const str = v.pipe(v.string("required"), v.trim());
export const schema = (added: string[]) =>
  v.object({
    firstName: v.pipe(str, v.nonEmpty("required")),
    lastName: v.pipe(str, v.nonEmpty("required")),
    email: v.pipe(
      str,
      v.nonEmpty("required"),
      v.email("invalid email"),
      v.check((input) => !added.includes(input), "already a member")
    ),
  });
