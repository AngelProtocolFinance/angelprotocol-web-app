import { Buffer } from "node:buffer";
import { data, redirect } from "@remix-run/react";
import type { LoaderFunctionArgs } from "@vercel/remix";
import { ap, ver } from "api/api";
import { getEndow } from "api/get/endow";
import { userEndows } from "api/get/user-endows";
import { cognito, oauth } from "auth/cognito";
import type { DetailedUser, OAuthState, UserV2 } from "types/auth";
import type { EndowmentBookmark } from "types/aws";

async function getBookmarks(user: UserV2): Promise<EndowmentBookmark[]> {
  const endows = await ap
    .get<number[]>(`${ver(1)}/bookmarks`, {
      throwHttpErrors: false,
      headers: { authorization: user.idToken },
    })
    .then((res) => (res.ok ? res.json() : []));

  const bookmarks: EndowmentBookmark[] = [];

  for (const id of endows) {
    const endow = await getEndow(id, ["name", "logo"]);
    bookmarks.push({ ...endow, endowId: id });
  }
  return bookmarks;
}

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
    const parsed = JSON.parse(
      Buffer.from(state, "base64").toString()
    ) as OAuthState;
    url.searchParams.delete("code");
    url.searchParams.delete("state");

    url.pathname = parsed.pathname;
    if (parsed.data && typeof parsed.data === "object") {
      url.searchParams.set("_s", btoa(JSON.stringify(parsed.data)));
    }
    //TODO send this data to the redirect route
    //const user = userFromIdToken(res.id_token, res.access_token);
    return redirect(url.toString(), { headers: { "Set-Cookie": res } });
  }

  const { user, headers } = await cognito.retrieve(request);
  if (!user) return data(null, { headers });
  return {
    ...user,
    bookmarks: getBookmarks(user),
    orgs: userEndows(user),
  } satisfies DetailedUser;
};
