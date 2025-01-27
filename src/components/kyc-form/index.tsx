import { type ActionFunction, redirect } from "@vercel/remix";
import { apes } from "api/api";
import { cognito, toAuth } from ".server/auth";

export { default } from "./kyc-form";
export { ErrorModal as ErrorBoundary } from "components/error";
export const action: ActionFunction = async ({ request, params }) => {
  const { user, headers } = await cognito.retrieve(request);
  if (!user) return toAuth(request, headers);

  await apes.put(`crypto-donation/${params.id}`, {
    headers: { authorization: user.idToken },
    json: await request.json(),
  });

  return redirect("..");
};
