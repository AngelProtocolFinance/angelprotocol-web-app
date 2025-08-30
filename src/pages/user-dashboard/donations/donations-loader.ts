import type { LoaderFunction } from "@vercel/remix";
import { search } from "helpers/https";
import type { UserV2 } from "types/auth";
import { type DonationsPage, donations_query_params } from "types/donations";
import { parse } from "valibot";
import { cognito, toAuth } from ".server/auth";
import { get_donations } from ".server/donations";

export interface DonationsData extends DonationsPage {
  user: UserV2;
}

export const loader: LoaderFunction = async ({ request }) => {
  const { user, headers } = await cognito.retrieve(request);
  if (!user) return toAuth(request, headers);
  const raw = search(request);
  const params = parse(donations_query_params, { ...raw, asker: user.email });
  const page = await get_donations(params);

  return { ...page, user } satisfies DonationsData;
};
