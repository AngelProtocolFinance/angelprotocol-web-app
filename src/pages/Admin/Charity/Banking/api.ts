import { type ActionFunction, redirect } from "@vercel/remix";
import { ap, ver } from "api/api";
import { cognito, redirectToAuth } from ".server/auth";

export const newBanking: ActionFunction = async ({ request }) => {
  const { user, headers } = await cognito.retrieve(request);
  if (!user) return redirectToAuth(request, headers);

  const payload = await request.json();

  await ap.post(`${ver(1)}/banking-applications`, {
    headers: { authorization: user.idToken },
    json: payload,
  });
  return redirect("..");
};
