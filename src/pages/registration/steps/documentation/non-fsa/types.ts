import type { INpoClaim, update_ein_fv } from "@better-giving/reg/schema";
export { update_ein_fv as schema } from "@better-giving/reg/schema";
import type { InferOutput } from "valibot";

export type Props = {
  reg_id: string;
  ein: string | undefined;
  claim?: INpoClaim;
};

export interface FV extends InferOutput<typeof update_ein_fv> {}
