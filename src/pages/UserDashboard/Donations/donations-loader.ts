import { loadAuth, redirectToAuth } from "auth";
import { APIs } from "constants/urls";
import { cacheGet } from "helpers/cache-get";
import type { LoaderFunction } from "react-router-dom";
import { version as v } from "services/helpers";
import type { UserV2 } from "types/auth";
import type { DonationsPage } from "types/aws";

export interface DonationsData extends DonationsPage {
  user: UserV2;
}

export const loader: LoaderFunction = async ({ request }) => {
  const from = new URL(request.url);
  const { page = "1", status = "final" } = Object.fromEntries(
    from.searchParams.entries()
  );

  const auth = await loadAuth();
  if (!auth) return redirectToAuth(request);

  const url = new URL(APIs.aws);
  url.pathname = `${v(2)}/donations`;
  url.searchParams.set("asker", auth.email);
  url.searchParams.set("page", page);
  url.searchParams.set("status", status);

  const req = new Request(url);
  req.headers.set("authorization", auth.idToken);

  return cacheGet(req)
    .then((res) => res.json())
    .then((data) => ({ ...data, user: auth }));
};
