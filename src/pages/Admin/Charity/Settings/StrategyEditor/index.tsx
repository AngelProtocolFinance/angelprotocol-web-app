import { AccountType } from "types/contracts";

export default function StrategyEditor({ type }: { type: AccountType }) {
  return <div>{type}</div>;
}
