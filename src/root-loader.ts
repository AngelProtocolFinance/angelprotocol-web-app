import { Buffer } from "node:buffer";
import { data, redirect } from "@remix-run/react";
import type { LoaderFunctionArgs } from "@vercel/remix";
import type { DetailedUser } from "types/auth";
import { cognito, oauth } from ".server/auth";
import { getUserBookmarks } from ".server/user-bookmarks";
import { getUserNpos } from ".server/user-npos";

export const loader = async ({ request }: LoaderFunctionArgs) => {
  console.log("app loads");
  /** handle oauth if applicable */
  const url = new URL(request.url);
  const code = url.searchParams.get("code");
  const state = url.searchParams.get("state");

  // handle oauth callback
  // TODO: don't let signin when already signed in
  if (code && state) {
    const res = await oauth.exchange(
      code,
      url.origin,
      request.headers.get("Cookie")
    );
    if (!res) return redirect(url.toString());

    //redirect to requestor
    const redirectTo = Buffer.from(state, "base64").toString();
    return redirect(redirectTo, { headers: { "Set-Cookie": res } });
  }

  const { user, headers } = await cognito.retrieve(request);
  if (!user) return data(null, { headers });
  return {
    ...user,
    bookmarks: getUserBookmarks(user.email),
    orgs: getUserNpos(user.email),
  } satisfies DetailedUser;
};
