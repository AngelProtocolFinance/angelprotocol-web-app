import DonorVerification from "./DonorVerification";
import Fees from "./Fees";

export default function OtherSettings() {
  return (
    <div className="grid content-start gap-8">
      <h2 className="text-[2rem] mb-8">Other Settings</h2>
      <Fees />
      <DonorVerification />
    </div>
  );
}
