import type { Application as IApplication } from "@better-giving/registration/approval";
import type { LoaderFunction, MetaFunction } from "@vercel/remix";
import { ap, ver } from "api/api";
import { cognito, redirectToAuth } from "auth";
import { metas } from "helpers/seo";
import type { UserV2 } from "types/auth";

export interface LoaderData {
  user: UserV2;
  application: IApplication;
}

export const loader: LoaderFunction = async ({ params, request }) => {
  const { user, headers } = await cognito.retrieve(request);
  if (!user) return redirectToAuth(request, headers);

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

export const meta: MetaFunction = ({ data }) => {
  if (!data) return [];
  return metas({
    title: `Application Review - ${(data as LoaderData).application.contact.org_name}`,
  });
};
