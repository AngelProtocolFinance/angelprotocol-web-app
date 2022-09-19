import { useFormContext } from "react-hook-form";
import { StrategyFormValues } from "./types";
import { roundDownToNum } from "helpers";

export default function RemainingAllocation() {
  const { watch } = useFormContext<StrategyFormValues>();
  const allocations = watch("allocations");

  const remainingPct =
    100 -
    allocations.reduce(
      (total, curr) => (isNaN(curr.percentage) ? 0 : curr.percentage + total),
      0
    );

  return <div>{roundDownToNum(remainingPct, 2)}</div>;
}
