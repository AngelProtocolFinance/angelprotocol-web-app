import type { INpoClaim } from "@better-giving/reg";
import { $req } from "@better-giving/schemas";
import { type InferOutput, object, pipe, regex } from "valibot";

export type Props = {
  reg_id: string;
  ein: string | undefined;
  claim?: INpoClaim;
};

export const schema = object({
  ein: pipe(
    $req,
    regex(/^[0-9a-zA-Z]{9,12}$/, "must only contain numbers and letters")
  ),
});

export interface FV extends InferOutput<typeof schema> {}
