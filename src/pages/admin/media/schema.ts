import { https_url } from "@better-giving/schemas";
import { type InferOutput, object } from "valibot";

export const schema = object({ url: https_url(true) });
export interface ISchema extends InferOutput<typeof schema> {}
