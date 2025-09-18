import { reg_id } from "@better-giving/reg/schema";
import { type InferOutput, object } from "valibot";

export const schema = object({ reference: reg_id });

export interface FV extends InferOutput<typeof schema> {}
