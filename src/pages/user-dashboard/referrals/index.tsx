import type { LoaderData } from "./api";
import { Earnings } from "./earnings";
export { loader } from "./api";
import { Explainer, Hub, Nonprofits, ReferralId } from "components/referrals";
import { metas } from "helpers/seo";
import { type MetaFunction, useLoaderData, useNavigate } from "react-router";

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
  } = useLoaderData() as LoaderData;
  return (
    <div className="">
      <Explainer classes="mb-4" />
      <Hub classes="mb-8" />
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
          ...(earnings.next && {
            load_next: () => navigate("earnings"),
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
