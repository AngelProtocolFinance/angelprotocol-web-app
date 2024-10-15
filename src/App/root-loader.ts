import { oauth } from "auth/cognito";
import { loadAuth } from "auth/load-auth";
import { APIs } from "constants/urls";
import { cacheGet } from "helpers/cache-get";
import { type LoaderFunctionArgs, defer, redirect } from "react-router-dom";
import { apiEnv } from "services/constants";
import { version as v } from "services/helpers";
import type { DetailedUser, OAuthState, UserV2 } from "types/auth";
import type { Endowment, EndowmentBookmark, UserEndow } from "types/aws";

export const rootLoader = async ({
  request,
}: LoaderFunctionArgs): Promise<null | ReturnType<typeof defer> | Response> => {
  console.log("root loader runs");
  /** reset all cache */
  //   const cache = await caches.open("bg");
  //   const keys = await cache.keys();
  //   await Promise.all(keys.map((k) => cache.delete(k)));

  /** handle oauth if applicable */
  const url = new URL(request.url);
  const code = url.searchParams.get("code");
  const state = url.searchParams.get("state");

  // handle oauth callback
  // TODO: don't let signin when already signed in
  if (code && state) {
    const res = await oauth.exchange(code);
    if (!res) return redirect(url.toString());

    //redirect to requestor
    const parsed = JSON.parse(window.atob(state)) as OAuthState;
    url.searchParams.delete("code");
    url.searchParams.delete("state");

    url.pathname = parsed.pathname;
    if (parsed.data && typeof parsed.data === "object") {
      url.searchParams.set("_s", btoa(JSON.stringify(parsed.data)));
    }

    //TODO send this data to the redirect route
    //const user = userFromIdToken(res.id_token, res.access_token);
    return redirect(url.toString());
  }

  const auth = await loadAuth();
  if (!auth) return null;

  return defer({
    ...auth,
    bookmarks: getBookmarks(auth),
    orgs: useEndows(auth),
  } satisfies DetailedUser);
};

async function getBookmarks(user: UserV2): Promise<EndowmentBookmark[]> {
  const source = new URL(APIs.aws);
  source.pathname = `${v(1)}/bookmarks`;
  const req = new Request(source);
  req.headers.set("authorization", user.idToken);

  const res = await fetch(req);
  if (!res.ok) return [];

  const endows: number[] = await res.json();

  const bookmarks: EndowmentBookmark[] = [];

  for (const id of endows) {
    const s = new URL(APIs.aws);
    s.pathname = `v9/endowments/${id}`;
    s.searchParams.set("env", apiEnv);
    s.searchParams.set("fields", "logo,name");
    const res = await cacheGet(s).then<Pick<Endowment, "name" | "logo">>(
      (res) => res.json()
    );
    bookmarks.push({ ...res, endowId: id });
  }
  return bookmarks;
}

async function useEndows(user: UserV2): Promise<UserEndow[]> {
  const source = new URL(APIs.aws);
  source.pathname = `${v(3)}/users/${user.email}/endowments`;
  const req = new Request(source);
  req.headers.set("authorization", user.idToken);
  return cacheGet(req).then<UserEndow[]>((res) => (res.ok ? res.json() : []));
}
