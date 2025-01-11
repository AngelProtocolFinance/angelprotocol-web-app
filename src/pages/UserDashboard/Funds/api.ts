import type { LoaderFunction } from "@vercel/remix";
import { ap, ver } from "api/api";
import { cognito, redirectToAuth } from "auth";

export const userFunds: LoaderFunction = async ({ request }) => {
  const { user, headers } = await cognito.retrieve(request);
  if (!user) return redirectToAuth(request, headers);

  return ap
    .get(`${ver(3)}/users/${user.email}/funds`, {
      headers: { authorization: user.idToken },
    })
    .json();
};
