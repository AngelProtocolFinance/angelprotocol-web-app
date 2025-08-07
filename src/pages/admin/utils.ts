import { $int_gte1 } from "@better-giving/endowment/schema";
import type { Params } from "@remix-run/react";
import type { ActionFunctionArgs, LoaderFunctionArgs } from "@vercel/remix";
import { resp } from "helpers/https";
import type { UserV2 } from "types/auth";
import { parse } from "valibot";
import { cognito, toAuth } from ".server/auth";

interface IChecked extends UserV2 {
  req: Request;
  params: Params<string>;
  id: number;
}

export const admin_checks = async ({
  request,
  params,
}: LoaderFunctionArgs | ActionFunctionArgs): Promise<Response | IChecked> => {
  const { user, headers } = await cognito.retrieve(request);
  if (!user) return toAuth(request, { headers });
  const id = parse($int_gte1, params.id);
  if (!user.groups.includes("ap-admin") && !user.endowments.includes(id)) {
    return resp.status(403);
  }
  return { ...user, id, req: request, params };
};

export const is_resp = (x: any): x is Response => x instanceof Response;
