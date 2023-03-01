import Transactions from "./Transactions";
import Withdrawer from "./Withdrawer";

export default function Withdraws() {
  return (
    <div className="grid gap-6">
      <h2 className="text-center font-bold text-3xl">Withdraw</h2>
      <Withdrawer />

      <h3 className="uppercase font-extrabold text-2xl mt-6 border-t border-prim pt-2">
        Transactions
      </h3>
      <Transactions />
    </div>
  );
}
