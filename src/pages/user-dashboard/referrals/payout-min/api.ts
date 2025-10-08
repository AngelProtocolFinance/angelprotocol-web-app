import { type ActionFunction, redirect } from "react-router";
import { type UserV2, is_error } from "types/auth";
import type { Route } from "./+types";
import { cognito, to_auth } from ".server/auth";

export interface LoaderData extends UserV2 {}

export const loader = async ({ request }: Route.LoaderArgs) => {
  const { user, headers } = await cognito.retrieve(request);
  if (!user) return to_auth(request, headers);

  return user;
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
