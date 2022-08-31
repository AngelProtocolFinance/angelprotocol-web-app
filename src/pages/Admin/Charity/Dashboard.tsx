import Accounts from "./Accounts";
import Transactions from "./Transactions";

export default function Dashboard() {
  return (
    <div className="grid grid-cols-2 gap-x-3 content-start justify-center">
      <Accounts />
      <h3 className="mt-10 col-span-2 text-xl font-bold text-zinc-50 my-1 uppercase">
        Strategies
      </h3>
      <div className="grid place-items-center col-span-2 h-48 rounded-md border-2 border-zinc-50/20 rounded-md p-4">
        <p className="text-lg text-zinc-100/70">Coming soon!</p>
      </div>

      <Transactions />
    </div>
  );
}
