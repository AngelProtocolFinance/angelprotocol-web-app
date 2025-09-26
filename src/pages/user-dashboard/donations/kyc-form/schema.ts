import { $, $req } from "@better-giving/schemas";
import * as v from "valibot";

const email = v.pipe($req, v.toLowerCase(), v.email("invalid"));
export const schema = v.object({
  name: v.object({ first: $req, last: $req }),
  address: v.object({ street: $req, complement: $ }),
  city: $req,
  postal_code: $req,
  //internal
  country: $req,
  email,
  //pre-selected
  us_state: v.string(),
  state: v.string(),
});

export interface FV extends v.InferOutput<typeof schema> {}
