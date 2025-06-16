import { type LoaderFunction, redirect } from "@vercel/remix";
import { cognito } from ".server/auth";

export const loader: LoaderFunction = async ({
  request,
}): Promise<Response | unknown> => {
  const { user, headers } = await cognito.retrieve(request);
  const from = new URL(request.url);
  const redirect_to = from.searchParams.get("redirect");
  if (user) return redirect(redirect_to || "/marketplace", { headers });
  return redirect_to || "/";
};
