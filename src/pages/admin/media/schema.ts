import { $req } from "@better-giving/schemas";
import { url, type InferOutput, object, pipe } from "valibot";

export const schema = object({ url: pipe($req, url("invalid url")) });
export interface ISchema extends InferOutput<typeof schema> {}
