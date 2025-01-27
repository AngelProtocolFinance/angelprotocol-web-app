import { regId } from "@better-giving/registration/models";
import { type InferOutput, object } from "valibot";

export const schema = object({ reference: regId });

export interface FormValues extends InferOutput<typeof schema> {}
