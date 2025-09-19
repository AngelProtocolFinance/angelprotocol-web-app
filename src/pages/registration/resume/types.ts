import { reg_id } from "@better-giving/reg/schema";
import { $req } from "@better-giving/schemas";
import { type InferOutput, object, pipe } from "valibot";

export const schema = object({ reference: pipe($req, reg_id) });

export interface FV extends InferOutput<typeof schema> {}
