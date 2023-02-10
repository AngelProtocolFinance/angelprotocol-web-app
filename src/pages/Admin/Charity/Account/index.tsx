import { AccountType } from "types/contracts";
import Balances from "./Balances";

export default function Account({ type }: { type: AccountType }) {
  return (
    <div>
      <h2 className="font-bold text-[2rem] capitalize mb-8">{type} Account</h2>
      <h5 className="text-2xl font-bold mb-8">Overview</h5>
      <Balances type={type} />
    </div>
  );
}
