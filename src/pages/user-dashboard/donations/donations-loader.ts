import type { LoaderFunction } from "@vercel/remix";
import type { UserV2 } from "types/auth";
import { type DonationsPage, donations_query_params } from "types/donations";
import { parse } from "valibot";
import { cognito, toAuth } from ".server/auth";
import { get_donations } from ".server/donations";

export interface DonationsData extends DonationsPage {
  user: UserV2;
}

export const loader: LoaderFunction = async ({ request }) => {
  const from = new URL(request.url);

  const { user, headers } = await cognito.retrieve(request);
  if (!user) return toAuth(request, headers);

  const raw = Object.fromEntries(from.searchParams.entries());
  const params = parse(donations_query_params, { ...raw, asker: user.email });
  const page = await get_donations(params);

  return { ...page, user } satisfies DonationsData;
};
