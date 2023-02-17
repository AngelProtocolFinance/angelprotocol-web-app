import Balance from "./Balance";

export default function Balances() {
  return (
    <div className="grid gap-4 md:grid-cols-2">
      <Balance type="liquid" />
      <Balance type="locked" />
    </div>
  );
}
