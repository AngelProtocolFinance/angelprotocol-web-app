import Transactions from "./Transactions";
import Withdrawer from "./Withdrawer";

export default function Withdraws() {
  return (
    <div className="grid gap-8 justify-items-center">
      <h2 className="text-center font-bold text-3xl -mb-2">Withdraw</h2>
      <Withdrawer />
      <Transactions />
    </div>
  );
}
