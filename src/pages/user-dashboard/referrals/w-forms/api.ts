import {
  type ActionFunction,
  type LoaderFunction,
  redirect,
} from "@vercel/remix";
import { isError } from "types/auth";
import { cognito, toAuth } from ".server/auth";
import { anvil_envs, env } from ".server/env";

export interface LoaderData {
  w9_url: string;
  w8ben_url: string;
}

const anvil_form_url = (forge_slug: string) =>
  `https://app.useanvil.com/weld/${anvil_envs.org_slug}/${forge_slug}${env === "staging" ? `?test=true` : ""}`;
export const loader: LoaderFunction = async ({ request }) => {
  const { user, headers } = await cognito.retrieve(request);
  if (!user) return toAuth(request, headers);

  if (user.w_form) return redirect("..");

  const wform: LoaderData = {
    w8ben_url: anvil_form_url("fw8ben"),
    w9_url: anvil_form_url("irs-w9"),
  };

  return wform;
};

export const action: ActionFunction = async ({ request }) => {
  const { user, headers, session } = await cognito.retrieve(request);
  if (!user) return toAuth(request, headers);

  const amnt = await request.text();
  const result = await cognito.updateUserAttributes(
    [{ Name: "custom:pay_min", Value: amnt }],
    user.accessToken
  );
  if (result !== "success") throw result.message;

  const res = await cognito.refresh(session);

  if (isError(res)) throw res.message;

  return redirect("..", {
    headers: {
      "Set-Cookie": res,
      "X-Remix-Revalidate": "1",
      "Cache-Control": "no-cache",
    },
  });
};
