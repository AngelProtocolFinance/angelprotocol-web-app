import { Earnings } from "./earnings";
import { Nonprofits } from "./nonprofits";
import { ReferralId } from "./referral-id";

export default function Referrals() {
  return (
    <div className="">
      <ReferralId />
      <Earnings />
      <Nonprofits />
    </div>
  );
}
