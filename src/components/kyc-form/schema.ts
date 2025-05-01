import * as v from "valibot";

const str = v.pipe(v.string("required"), v.trim());
const rqrd = v.pipe(str, v.nonEmpty("required"));
const email = v.pipe(str, v.email("invalid"));
export const schema = v.object({
  name: v.object({ first: rqrd, last: rqrd }),
  address: v.object({ street: rqrd, complement: str }),
  city: rqrd,
  postalCode: rqrd,
  //internal
  country: v.object({ name: rqrd, code: str, flag: str }),
  kycEmail: email,
  //pre-selected
  usState: v.object({ label: str, value: str }),
  state: str,
});

export const schemaDbUpdate = v.object({
  fullName: rqrd,
  kycEmail: email,
  streetAddress: rqrd,
  city: rqrd,
  state: str,
  zipCode: rqrd,
  country: rqrd,
});

export interface FV extends v.InferOutput<typeof schema> {}
