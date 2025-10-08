import {
  type ActionFunction,
  type LoaderFunctionArgs,
  redirect,
} from "react-router";
import { is_error } from "types/auth";
import { cognito, to_auth } from ".server/auth";
import { anvil_envs, env } from ".server/env";

export interface LoaderData {
  w9_url: string;
  w8ben_url: string;
}

const anvil_form_url = (forge_slug: string) =>
  `https://app.useanvil.com/weld/${anvil_envs.org_slug}/${forge_slug}${env === "staging" ? "?test=true" : ""}`;
export const loader = async ({ request }: LoaderFunctionArgs) => {
  const { user, headers } = await cognito.retrieve(request);
  if (!user) return to_auth(request, headers);

  const wform: LoaderData = {
    w8ben_url: anvil_form_url("fw8ben"),
    w9_url: anvil_form_url("irs-w9"),
  };

  return wform;
};

export const action: ActionFunction = async ({ request }) => {
  const { user, headers, session } = await cognito.retrieve(request);
  if (!user) return to_auth(request, headers);

  const amnt = await request.text();
  const result = await cognito.update_user_attributes(
    [{ Name: "custom:pay_min", Value: amnt }],
    user.token_access
  );
  if (result !== "success") throw result.message;

  const res = await cognito.refresh(session);

  if (is_error(res)) throw res.message;

  return redirect("..", {
    headers: {
      "set-cookie": res.commit,
      "x-remix-revalidate": "1",
      "cache-control": "no-cache",
    },
  });
};
