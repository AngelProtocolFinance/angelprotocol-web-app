import {
  type ActionFunction,
  type LoaderFunction,
  data,
  redirect,
} from "@vercel/remix";
import { parseWithValibot } from "conform-to-valibot";
import type { ActionData } from "types/action";
import { isError } from "types/auth";
import { parse } from "valibot";
import { emailSchema, passwordSchema } from "./schema";
import { type LoaderData, step } from "./types";
import { cognito } from ".server/auth";

export const loader: LoaderFunction = ({ request }) => {
  const url = new URL(request.url);
  const { redirect, ..._step } = Object.fromEntries(url.searchParams.entries());
  return {
    redirect,
    step: parse(step, _step),
  } satisfies LoaderData;
};

export const action: ActionFunction = async ({ request }) => {
  const fv = await request.formData();
  const email = fv.get("email")!.toString();

  if (fv.get("intent") === "edit-email") {
    const to = new URL(request.url);
    to.searchParams.set("type", "init");
    return redirect(to.toString());
  }

  if (fv.get("intent") === "resend-otp") {
    const res = await cognito.resendConfirmationCode(email);
    if (isError(res)) return data({ __err: res.message } satisfies ActionData);
    return data({ __ok: "OTP sent" } satisfies ActionData);
  }

  if (fv.get("intent") === "confirm") {
    const payload = parseWithValibot(fv, { schema: passwordSchema });
    if (payload.status !== "success") return payload.reply();

    const res = await cognito.confirmForgotPassword(
      email,
      payload.value.password,
      payload.value.otp
    );
    if (isError(res)) {
      return payload.reply({ fieldErrors: { otp: [res.message] } });
    }
    const to = new URL(request.url);
    to.searchParams.set("type", "success");
    return redirect(to.toString());
  }

  const payload = parseWithValibot(fv, { schema: emailSchema });

  if (payload.status !== "success") return payload.reply();

  const res = await cognito.forgotPassword(payload.value.email);
  if (isError(res)) {
    return payload.reply({ fieldErrors: { email: [res.message] } });
  }

  const to = new URL(request.url);
  to.searchParams.set("type", "set-password");
  to.searchParams.set("recipient_raw", payload.value.email);
  to.searchParams.set("recipient_obscured", res);

  return redirect(to.toString());
};
