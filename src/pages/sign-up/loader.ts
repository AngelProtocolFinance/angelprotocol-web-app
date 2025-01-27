import { type LoaderFunction, redirect } from "@vercel/remix";
import { cognito } from ".server/auth";

export const loader: LoaderFunction = async ({
  request,
}): Promise<Response | unknown> => {
  const { user, headers } = await cognito.retrieve(request);
  if (user) return redirect("/marketplace", { headers });
  return new URL(request.url).searchParams.get("redirect") || "/";
};
