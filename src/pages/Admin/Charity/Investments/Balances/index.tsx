import Balance from "./Balance";

export default function Balances() {
  return (
    <div className="grid grid-rows-[auto_auto_1fr] text-zinc-50/80">
      <h3 className="uppercase font-heading text-2xl font-bold">
        Investment balances
      </h3>
      <p className="mb-6">see your endowment investment balances</p>
      <div className="grid grid-cols-2 border border-zinc-50/30 divide-x divide-zinc-50/30 rounded-sm">
        <Balance type="liquid" />
        <Balance type="locked" />
      </div>
    </div>
  );
}
