import { https_url, orgDesignation } from "@better-giving/schemas";
import * as v from "valibot";

const rqrd = v.pipe(v.string(), v.nonEmpty("required"));
export const schema = v.object({
  website: https_url(true),
  hq_country: rqrd,
  designation: v.pipe(rqrd, orgDesignation),
  active_in_countries: v.array(v.string()),
});

export interface FV extends v.InferOutput<typeof schema> {}
