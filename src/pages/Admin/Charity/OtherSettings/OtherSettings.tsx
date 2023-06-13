import DonorVerification from "./DonorVerification";
import Fees from "./Fees";
import Splits from "./Splits";

export default function OtherSettings() {
  return (
    <div className="grid content-start gap-8">
      <h2 className="text-[2rem]">Other Settings</h2>
      <Splits />
      <Fees />
      <DonorVerification />
    </div>
  );
}
