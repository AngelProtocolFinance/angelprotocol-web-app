import type { LoaderFunction } from "@remix-run/react";
import { ap, toSearch, ver } from "api/api";
import { loadAuth, redirectToAuth } from "auth";
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

  return ap
    .get(`${ver(2)}/donations`, {
      headers: { authorization: auth.idToken },
      searchParams: toSearch({ asker: auth.email, page, status }),
    })
    .json()
    .then((data: any) => ({ ...data, user: auth }));
};
