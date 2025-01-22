import type { Application as IApplication } from "@better-giving/registration/approval";
import type { LoaderFunction } from "@vercel/remix";
import { ap, ver } from "api/api";
import type { UserV2 } from "types/auth";
import { cognito, toAuth } from ".server/auth";

export interface LoaderData {
  user: UserV2;
  application: IApplication;
}

export const loader: LoaderFunction = async ({ params, request }) => {
  const { user, headers } = await cognito.retrieve(request);
  if (!user) return toAuth(request, headers);

  const application = await ap
    .get<IApplication>(`${ver(1)}/registrations/${params.id}`, {
      headers: { authorization: user.idToken },
    })
    .json();

  return {
    application,
    user,
  } satisfies LoaderData;
};
