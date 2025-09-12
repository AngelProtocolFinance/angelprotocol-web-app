import { type LoaderFunctionArgs, redirect } from "react-router";
import { cognito } from ".server/auth";

export const loader = async ({ request }: LoaderFunctionArgs) => {
  const { user, headers } = await cognito.retrieve(request);
  const from = new URL(request.url);
  const redirect_to = from.searchParams.get("redirect");
  if (user) return redirect(redirect_to || "/marketplace", { headers });
  return redirect_to || "/";
};
