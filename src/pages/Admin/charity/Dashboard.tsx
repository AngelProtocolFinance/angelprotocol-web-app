import Accounts from "./Accounts";
import Transactions from "./Transactions";

export default function Dashboard() {
  return (
    <div className="grid grid-cols-2 gap-x-3 content-start justify-center">
      <Accounts />
      <h3 className="mt-8 col-span-2 text-xl font-bold text-zinc-50 my-1 uppercase">
        Strategies
      </h3>
      <div className="grid place-items-center col-span-2 h-60 bg-zinc-50/10 rounded-md shadow-inner">
        <p className="text-lg text-zinc-100">Coming soon!</p>
      </div>

      <Transactions />
    </div>
  );
}
