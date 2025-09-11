import { Explainer, Hub, Nonprofits, ReferralId } from "components/referrals";
import { metas } from "helpers/seo";
import { useNavigate } from "react-router";
import { CacheRoute, createClientLoaderCache } from "remix-client-cache";
import type { Route } from "./+types";
import { Earnings } from "./earnings";

export const meta: Route.MetaFunction = () => {
  return metas({
    title: "My Referrals",
    description: "Track your referrals and earnings on Better Giving.",
  });
};
export { loader } from "./api";
export const clientLoader = createClientLoaderCache<Route.ClientLoaderArgs>();
export default CacheRoute(Page);

function Page({ loaderData }: Route.ComponentProps) {
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
  } = loaderData;
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
