import CommissionData from "./CommissionData";
import DonationsData from "./DonationsData";

export default function ValidatorBoard() {
  return (
    <div className="w-full h-auto grid grid-cols-2 gap-5">
      <CommissionData />
      <DonationsData />
    </div>
  );
}
