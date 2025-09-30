import type { IDonationFinal } from "@better-giving/donation";
import type { IPageKeyed } from "@better-giving/types/api";
import { search } from "helpers/https";
import type { Route } from "./+types";
import { cognito, to_auth } from ".server/auth";
import { dondb } from ".server/aws/db";

export interface LoaderData extends IPageKeyed<IDonationFinal> {}
export const loader = async ({ request }: Route.LoaderArgs) => {
  const { user, headers } = await cognito.retrieve(request);
  if (!user) return to_auth(request, headers);
  const { next } = search(request);

  const page = await dondb.referred_by(user.referral_id, {
    next: next,
    limit: 8,
  });
  return page satisfies LoaderData;
};
