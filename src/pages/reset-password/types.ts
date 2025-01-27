import * as v from "valibot";

export const codeRecipient = v.object({
  recipient_raw: v.pipe(v.string(), v.email()),
  recipient_obscured: v.string(),
});

export interface CodeRecipient extends v.InferOutput<typeof codeRecipient> {}

export const initStep = v.object({
  type: v.literal("init"),
});

export interface InitStep extends v.InferOutput<typeof initStep> {}

export const setPasswordStep = v.object({
  type: v.literal("set-password"),
  ...codeRecipient.entries,
});

export interface SetPasswordStep
  extends v.InferOutput<typeof setPasswordStep> {}

export const successStep = v.object({
  type: v.literal("success"),
});

export interface SuccessStep extends v.InferOutput<typeof successStep> {}

export const step = v.fallback(
  v.variant("type", [initStep, setPasswordStep, successStep]),
  { type: "init" }
);

export interface LoaderData {
  redirect: string;
  step: v.InferOutput<typeof step>;
}
