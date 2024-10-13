import { loadAuth, userRes } from "auth/load-auth";
import { APIs } from "constants/urls";
import { cacheGet } from "helpers/cache-get";
import { type LoaderFunctionArgs, defer } from "react-router-dom";
import { apiEnv } from "services/constants";
import { version as v } from "services/helpers";
import type { DetailedUser, UserV2 } from "types/auth";
import type { Endowment, EndowmentBookmark, UserEndow } from "types/aws";

export const rootLoader = async ({
  request,
}: LoaderFunctionArgs): Promise<null | ReturnType<typeof defer> | Response> => {
  /** reset all cache */
  const cache = await caches.open("bg");
  const keys = await cache.keys();
  await Promise.all(keys.map((k) => cache.delete(k)));
  const auth = await loadAuth(request);
  if (!auth) return null;
  if (!userRes(auth)) return auth;

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
  req.headers.set("authorization", `Bearer ${user.idToken}`);

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
  req.headers.set("authorization", `Bearer ${user.idToken}`);

  return fetch(req).then<UserEndow[]>((res) => (res.ok ? res.json() : []));
}
