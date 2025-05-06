import type { LoaderFunction } from "@vercel/remix";
import type { UserV2 } from "types/auth";
import type { Referred } from "types/referrals";
import { cognito, toAuth } from ".server/auth";
import { referredBy } from ".server/referrals";

export interface LoaderData {
  user: UserV2;
  referreds: Referred[];
  origin: string;
}

export const loader: LoaderFunction = async ({ request }) => {
  const { user, headers } = await cognito.retrieve(request);
  if (!user) return toAuth(request, headers);

  const referreds = await referredBy("X2ZV-OWVA");

  return {
    user,
    origin: new URL(request.url).origin,
    referreds,
  } satisfies LoaderData;
};
