import { type ActionFunction, redirect } from "@vercel/remix";
import { apes } from "api/api";
import { cognito, redirectToAuth } from "auth";

export { default } from "./KYCForm";

export const action: ActionFunction = async ({ request, params }) => {
  const { user, headers } = await cognito.retrieve(request);
  if (!user) return redirectToAuth(request, headers);

  await apes.put(`crypto-donation/${params.id}`, {
    headers: { authorization: user.idToken },
    json: await request.json(),
  });

  return redirect("..");
};
