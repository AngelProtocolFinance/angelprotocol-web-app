import type { NewFund } from "@better-giving/fundraiser";
import {
  type ActionFunction,
  type LinksFunction,
  type LoaderFunction,
  redirect,
} from "@vercel/remix";
import { ap, ver } from "api/api";
import { imgEditorStyles } from "components/img-editor";
import { richTextStyles } from "components/rich-text";
import { adminRoutes, appRoutes } from "constants/routes";
import { search } from "helpers/https";
import { isError } from "types/auth";
import { cognito, toAuth } from ".server/auth";
import { npodb } from ".server/aws/db";

export { ErrorBoundary } from "components/error";
export { default } from "./create-fund";
export const links: LinksFunction = () => [
  ...richTextStyles,
  ...imgEditorStyles,
];
export const loader: LoaderFunction = async ({ request }) => {
  const { user, headers } = await cognito.retrieve(request);
  if (!user) return toAuth(request, headers);
  const { npo: id } = search(request);
  const npo = id ? await npodb.npo(+id) : null;
  return npo;
};

export const action: ActionFunction = async ({ request }) => {
  const { user, headers, session } = await cognito.retrieve(request);
  if (!user) return toAuth(request, headers);

  const payload: NewFund = await request.json();

  await ap
    .post<{ id: string }>(`${ver(1)}/funds`, {
      json: payload,
      headers: { authorization: user.idToken },
    })
    .json();

  //delay to give room for credentials to be written in db
  await new Promise((r) => setTimeout(r, 500));
  const refreshed = await cognito.refresh(session);
  const commit = isError(refreshed)
    ? undefined
    : { headers: { "Set-Cookie": refreshed.commit } };

  if (payload.npo_owner) {
    return redirect(`${appRoutes.admin}/${adminRoutes.funds}`, commit);
  }
  return redirect(`${appRoutes.user_dashboard}/funds`, commit);
};
