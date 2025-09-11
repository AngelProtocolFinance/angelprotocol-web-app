import { type ActionFunction, redirect } from "react-router";
import { type UserV2, isError } from "types/auth";
import type { Route } from "./+types";
import { cognito, toAuth } from ".server/auth";

export interface LoaderData extends UserV2 {}

export const loader = async ({ request }: Route.LoaderArgs) => {
  const { user, headers } = await cognito.retrieve(request);
  if (!user) return toAuth(request, headers);

  return user;
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
      "set-cookie": res.commit,
      "x-remix-revalidate": "1",
      "cache-control": "no-cache",
    },
  });
};
