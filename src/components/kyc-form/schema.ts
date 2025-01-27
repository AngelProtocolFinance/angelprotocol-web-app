import * as v from "valibot";

const str = v.pipe(v.string("required"), v.trim());
const rqrd = v.pipe(str, v.nonEmpty("required"));
export const schema = v.object({
  name: v.object({ first: rqrd, last: rqrd }),
  address: v.object({ street: rqrd, complement: str }),
  city: rqrd,
  postalCode: rqrd,
  //internal
  country: v.object({ name: rqrd, code: str, flag: str }),
  kycEmail: v.pipe(str, v.email("invalid")),
  //pre-selected
  usState: v.object({ label: str, value: str }),
  state: str,
});

export interface FV extends v.InferOutput<typeof schema> {}
