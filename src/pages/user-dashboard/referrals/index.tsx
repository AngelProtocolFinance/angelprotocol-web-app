import { useNavigate } from "@remix-run/react";
import type { LoaderData } from "./api";
import { Earnings } from "./earnings";
export { loader } from "./api";
export { clientLoader } from "api/cache";
import { useCachedLoaderData } from "api/cache";
import { Explainer, Nonprofits, ReferralId } from "components/referrals";

export function ReferralsPage() {
  const navigate = useNavigate();
  const {
    origin,
    user,
    referreds,
    earnings,
    pendings,
    payout,
    payout_min,
    payout_ltd,
  } = useCachedLoaderData() as LoaderData;
  return (
    <div className="">
      <Explainer classes="mb-2" />
      <h3 className="mt-8 mb-4 text-2xl">My Referral ID and Link</h3>
      <ReferralId
        classes="mb-8"
        referral_id={user.referral_id}
        origin={origin}
      />
      <Earnings
        classes="mb-8"
        earnings={{
          items: earnings.items,
          ...(earnings.nextKey && {
            onViewMore: () => navigate("earnings"),
          }),
        }}
        payout={payout}
        payout_min={payout_min}
        pendings={pendings}
        payout_ltd={payout_ltd}
      />
      <Nonprofits npos={referreds} classes="mb-8" />
    </div>
  );
}

export default ReferralsPage;
