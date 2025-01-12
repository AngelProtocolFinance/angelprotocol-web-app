import { type ActionFunction, redirect } from "@vercel/remix";
import { apes } from "api/api";
import { cognito, redirectToAuth } from "auth";

export const moveFundAction: ActionFunction = async ({ params, request }) => {
  const { user, headers } = await cognito.retrieve(request);
  if (!user) return redirectToAuth(request, headers);

  await apes.put(`endowments/${params.id}/move-balance`, {
    headers: { authorization: user.idToken },
    json: await request.json(),
  });
  return redirect("..");
};
