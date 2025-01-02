import { cognito } from "auth";
import { parseWithValibot } from "conform-to-valibot";
import { decodeState } from "helpers/state-params";
import {
  type ActionFunction,
  type LoaderFunction,
  redirect,
} from "react-router";
import type { ActionData } from "types/action";
import { isError } from "types/auth";
import { parse } from "valibot";
import { emailSchema, passwordSchema } from "./schema";
import { type LoaderData, step } from "./types";
export { default } from "./ResetPassword";

export const clientLoader: LoaderFunction = ({ request }) => {
  const url = new URL(request.url);
  const { _s, ..._step } = Object.fromEntries(url.searchParams.entries());
  return {
    state: decodeState(_s),
    step: parse(step, _step),
  } satisfies LoaderData;
};

export const clientAction: ActionFunction = async ({ request }) => {
  const params = new URL(request.url).searchParams;
  const fv = await request.formData();

  if (fv.get("intent") === "edit-email") {
    const to = new URL(request.url);
    to.searchParams.set("type", "init");
    return redirect(to.toString());
  }

  if (fv.get("intent") === "resent-otp") {
    const res = await cognito.resendConfirmationCode(
      params.get("recipient_raw")!
    );
    if (isError(res)) return { __err: res.message } satisfies ActionData;
    return { __ok: "OTP resent" } satisfies ActionData;
  }

  if (fv.get("intent") === "confirm") {
    const payload = parseWithValibot(fv, { schema: passwordSchema });
    if (payload.status !== "success") return payload.reply();

    const res = await cognito.confirmForgotPassword(
      params.get("recipient_raw")!,
      payload.value.otp,
      payload.value.password
    );
    if (isError(res)) {
      return payload.reply({ fieldErrors: { otp: [res.message] } });
    }
  }

  const payload = parseWithValibot(fv, { schema: emailSchema });

  if (payload.status !== "success") return payload.reply();

  const res = await cognito.forgotPassword(payload.value.email);
  if (isError(res)) {
    return payload.reply({ fieldErrors: { email: [res.message] } });
  }

  params.set("type", "set-password");
  params.set("recipient_raw", payload.value.email);
  params.set("recipient_obscured", res);

  return redirect(`.?${params.toString()}`);
};
