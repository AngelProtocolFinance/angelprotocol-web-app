import { Progress } from "@better-giving/reg/progress";
import { type IReg, reg_id } from "@better-giving/reg/schema";
import { type LoaderFunction, redirect } from "@vercel/remix";
import { parse } from "valibot";
import type { Reg$IdData } from "../types";
import { cognito, toAuth } from ".server/auth";
import { regdb } from ".server/aws/db";

export const reg_loader: LoaderFunction = async ({ params, request }) => {
  const { user, headers } = await cognito.retrieve(request);
  if (!user) return toAuth(request, headers);
  const rid = parse(reg_id, params.regId);
  const reg = await regdb.reg(rid);
  if (!reg) return { status: 404 };
  return {
    user,
    reg,
  } satisfies Reg$IdData;
};

export const step_loader =
  (
    this_step: Progress["step"],
    intercept?: (reg: IReg) => Response | undefined
  ): LoaderFunction =>
  async ({ params, request }) => {
    const { user, headers } = await cognito.retrieve(request);
    if (!user) return toAuth(request, headers);
    const rid = parse(reg_id, params.regId);

    const reg = await regdb.reg(rid);
    if (!reg) return { status: 404 };

    const res = intercept?.(reg);
    if (res) return res;

    const r = new Progress(reg);

    if (this_step > r.step) {
      return redirect(`../${r.step}`);
    }

    return reg;
  };
