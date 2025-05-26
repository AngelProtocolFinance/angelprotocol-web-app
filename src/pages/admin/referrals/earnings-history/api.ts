import type { LoaderFunction } from "@vercel/remix";
import { plusInt } from "api/schema/endow-id";
import type { EarningsPage } from "types/referrals";
import { parse } from "valibot";
import { cognito, toAuth } from ".server/auth";
import { getEarnings } from ".server/donations";
import { getNpo } from ".server/npo";

export interface LoaderData extends EarningsPage {}

export const loader: LoaderFunction = async ({ request, params }) => {
  const { user, headers } = await cognito.retrieve(request);
  if (!user) return toAuth(request, headers);

  const id = parse(plusInt, params.id);
  if (!user.endowments.includes(id)) return { status: 403 };

  const x = await getNpo(id, ["referral_id"]);
  if (!x) return { status: 404 };

  if (!x.referral_id) throw `@dev: referral_id not found for npo:${id}`;

  const url = new URL(request.url);
  const nextKey = url.searchParams.get("nextKey");

  const page = await getEarnings(x.referral_id, nextKey, 8);

  return page;
};
