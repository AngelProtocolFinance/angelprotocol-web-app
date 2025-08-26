import { apes } from "api/api";
import { type ActionFunction, redirect } from "react-router";
import { cognito, toAuth } from ".server/auth";

export const moveFundAction: ActionFunction = async ({ params, request }) => {
  const { user, headers } = await cognito.retrieve(request);
  if (!user) return toAuth(request, headers);

  await apes.put(`endowments/${params.id}/move-balance`, {
    headers: { authorization: user.idToken },
    json: await request.json(),
  });
  return redirect("..");
};
