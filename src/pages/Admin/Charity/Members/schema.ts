import * as v from "valibot";
const str = v.pipe(v.string("required"), v.trim());
export const schema = v.object({
  firstName: v.pipe(str, v.nonEmpty("required")),
  lastName: v.pipe(str, v.nonEmpty("required")),
  email: v.pipe(str, v.nonEmpty("required"), v.email("invalid email")),
});
