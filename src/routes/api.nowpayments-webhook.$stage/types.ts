import { type InferOutput, picklist } from "valibot";
export { parse } from "valibot";

export const stage = picklist(["staging", "production"]);
export type Stage = InferOutput<typeof stage>;
