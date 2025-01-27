import type { LoaderFunction } from "@vercel/remix";
import { ap, toSearch, ver } from "api/api";
import type { UserV2 } from "types/auth";
import type { DonationsPage } from "types/aws";
import { cognito, toAuth } from ".server/auth";

export interface DonationsData extends DonationsPage {
  user: UserV2;
}

export const loader: LoaderFunction = async ({ request }) => {
  const from = new URL(request.url);
  const { page = "1", status = "final" } = Object.fromEntries(
    from.searchParams.entries()
  );

  const { user, headers } = await cognito.retrieve(request);
  if (!user) return toAuth(request, headers);

  return ap
    .get(`${ver(2)}/donations`, {
      headers: { authorization: user.idToken },
      searchParams: toSearch({ asker: user.email, page, status }),
    })
    .json()
    .then((data: any) => ({ ...data, user }));
};
