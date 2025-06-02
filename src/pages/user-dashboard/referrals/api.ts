import type { V2RecipientAccount } from "@better-giving/wise";
import { type LoaderFunction, data } from "@vercel/remix";
import { type UserV2, isError } from "types/auth";
import type { EarningsPage, PendingEarnings, Referred } from "types/referrals";
import { cognito, toAuth } from ".server/auth";
import type { Stored } from ".server/auth/session";
import { getEarnings } from ".server/donations";
import { paidOutLtd, pendingEarnings, referredBy } from ".server/referrals";
import { wise } from ".server/sdks";

export interface LoaderData {
  user: UserV2;
  referreds: Referred[];
  earnings: EarningsPage;
  pendings: PendingEarnings;
  payout?: V2RecipientAccount;
  payout_ltd: number;
  payout_min?: number;
  origin: string;
  w_form?: string;
}

function payout(id: number) {
  return wise.v2Account(id);
}

export const loader: LoaderFunction = async ({ request }) => {
  const { user, headers, session } = await cognito.retrieve(request);
  if (!user) return toAuth(request, headers);

  const [pendings, referreds, earnings, p, pltd] = await Promise.all([
    pendingEarnings(user.referral_id),
    referredBy(user.referral_id),
    getEarnings(user.referral_id, null, 4),
    user.pay_id ? payout(+user.pay_id) : undefined,
    paidOutLtd(user.referral_id),
  ]);

  const sp = new URL(request.url).searchParams;
  const wform_commit = await commit_wform(user, session, sp.get("weld_data"));

  return data(
    {
      user,
      origin: new URL(request.url).origin,
      referreds,
      earnings,
      pendings,
      payout: p,
      payout_min: user.pay_min ? +user.pay_min : undefined,
      payout_ltd: pltd,
      w_form: user.w_form,
    } satisfies LoaderData,
    { headers: { ...(wform_commit ? { "Set-Cookie": wform_commit[0] } : {}) } }
  );
};

async function commit_wform(
  user: UserV2,
  sesssion: Stored,
  weld_data_eid_param: string | null
): Promise<string | null> {
  if (user.w_form) {
    console.log("user already has a w_form attribute, skipping commit");
    return null;
  }

  if (!weld_data_eid_param) return null;

  const res = await cognito.updateUserAttributes(
    [{ Name: "custom:w_form", Value: weld_data_eid_param }],
    user.accessToken
  );
  if (isError(res)) {
    console.error("Error updating user attributes:", res.message);
    return null;
  }
  const commitment = await cognito.refresh(sesssion);
  if (isError(commitment)) {
    console.error("Error refreshing session:", commitment.message);
    return null;
  }
  return commitment;
}
