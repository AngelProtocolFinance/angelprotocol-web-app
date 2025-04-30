import { useLoaderData } from "@remix-run/react";
import type { UserV2 } from "types/auth";
import { Earnings } from "./earnings";
import { Nonprofits } from "./nonprofits";
import { ReferralId } from "./referral-id";
export { loader } from "./api";

export function ReferralsPage() {
  const { origin, ...user } = useLoaderData() as UserV2 & { origin: string };
  return (
    <div className="">
      <h2 className="text-2xl font-semibold text-gray-d4 mb-4">My referrals</h2>
      <ReferralId
        classes="mb-8"
        referral_id={user.referral_id}
        origin={origin}
      />
      <Earnings classes="mb-8" />
      <Nonprofits classes="mb-8" />
    </div>
  );
}

export default ReferralsPage;
