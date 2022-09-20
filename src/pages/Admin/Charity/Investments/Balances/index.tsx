import Balance from "./Balance";

export default function Balances() {
  return (
    <div className="grid grid-cols-2 border border-zinc-50/30 divide-x divide-zinc-50/30 rounded-sm">
      <Balance type="liquid" />
      <Balance type="locked" />
    </div>
  );
}
