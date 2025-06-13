import { useNavigate } from "@remix-run/react";
import type { LoaderData } from "./api";
import { Earnings } from "./earnings";
export { loader } from "./api";
export { clientLoader } from "api/cache";
import type { MetaFunction } from "@vercel/remix";
import { useCachedLoaderData } from "api/cache";
import { Explainer, Nonprofits, ReferralId } from "components/referrals";
import { metas } from "helpers/seo";

export const meta: MetaFunction = () => {
  return metas({
    title: "My Referrals",
    description: "Track your referrals and earnings on Better Giving.",
  });
};

export function ReferralsPage() {
  const navigate = useNavigate();
  const {
    base_url,
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
      <Explainer classes="mb-4" />
      <h3 className="mt-8 mb-4 text-2xl">My Referral ID and Link</h3>
      <ReferralId
        classes="mb-8"
        referral_id={user.referral_id}
        base_url={base_url}
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
        w_form={user.w_form}
      />
      <Nonprofits npos={referreds} classes="mb-8" />
    </div>
  );
}

export default ReferralsPage;
