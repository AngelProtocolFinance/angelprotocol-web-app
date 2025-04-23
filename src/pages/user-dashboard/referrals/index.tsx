import { Earnings } from "./earnings";
import { Nonprofits } from "./nonprofits";
import { ReferralId } from "./referral-id";

export function ReferralsPage() {
  return (
    <div className="">
      <ReferralId classes="mb-8" />
      <Earnings classes="mb-8" />
      <Nonprofits classes="mb-8" />
    </div>
  );
}

export default ReferralsPage;
