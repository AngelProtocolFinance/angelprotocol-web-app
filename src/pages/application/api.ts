import type { Application as IApplication } from "@better-giving/registration/approval";
import { sansKeys } from "@better-giving/registration/db";
import { regId } from "@better-giving/registration/models";
import type { LoaderFunction } from "react-router";
import type { UserV2 } from "types/auth";
import { parse } from "valibot";
import { cognito, toAuth } from ".server/auth";
import { getReg } from ".server/registration/get-reg";

export interface LoaderData {
  user: UserV2;
  application: IApplication;
}

export const loader: LoaderFunction = async ({ params, request }) => {
  const { user, headers } = await cognito.retrieve(request);
  if (!user) return toAuth(request, headers);

  const id = parse(regId, params.id);

  const reg = await getReg(id);
  if (!reg) throw new Response("Registration not found", { status: 404 });
  const application = sansKeys(reg) as IApplication;

  return {
    application,
    user,
  } satisfies LoaderData;
};
