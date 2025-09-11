import { Progress } from "@better-giving/reg/progress";
import { reg_id } from "@better-giving/reg/schema";
import { regRoutes } from "constants/routes";
import { resp } from "helpers/https";
import {
  type LoaderFunction,
  type LoaderFunctionArgs,
  redirect,
} from "react-router";
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
  (this_step: Progress["step"]) =>
  async ({ params, request }: LoaderFunctionArgs) => {
    const { user, headers } = await cognito.retrieve(request);
    if (!user) return toAuth(request, headers);
    const rid = parse(reg_id, params.regId);

    const reg = await regdb.reg(rid);
    if (!reg) return resp.status(404);

    const r = new Progress(reg);

    if (reg.status === "02" && this_step !== 6) {
      return redirect(`../${6}`);
    }

    if (reg.status === "03") {
      const to = `../../${regRoutes.success}?name=${reg.o_name}&id=${reg.status_approved_npo_id}`;
      return redirect(to);
    }

    if (this_step > r.step) {
      return redirect(`../${r.step}`);
    }

    return reg;
  };
