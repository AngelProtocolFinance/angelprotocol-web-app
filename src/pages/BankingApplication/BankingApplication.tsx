import type { BankDetails } from "api/get/payout-method";
import Seo from "components/Seo";
import { useLoaderData } from "react-router-dom";
import Loaded from "./Loaded";

export function BankingApplication() {
  const bank = useLoaderData() as BankDetails;

  return (
    <div className="grid content-start gap-y-4 lg:gap-y-8 lg:gap-x-3 relative padded-container py-20">
      <Seo title="Banking application review" />
      <Loaded {...bank} />
    </div>
  );
}
