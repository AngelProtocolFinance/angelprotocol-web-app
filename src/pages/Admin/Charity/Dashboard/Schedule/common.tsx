import Icon from "components/Icon";
import type { Allocation } from "types/aws";

export const MIN_PROCESSING_AMOUNT = 50;

export function toAlloc(input: string): Allocation {
  const [a, b, c] = input.split("-").map((str) => Number.parseInt(str, 10));
  return { cash: a, liq: b, lock: c };
}

export function toKey(input: Allocation): string {
  const padNumber = (num: number): string => num.toString().padStart(3, "0");
  return `${padNumber(input.cash)}-${padNumber(input.liq)}-${padNumber(
    input.lock
  )}`;
}

export const allocationOptions = [
  {
    value: "000-000-100",
    label: "Endowment Builder",
    description: "100% Investment",
    icon: <Icon type="Trees" className="h-6 w-6 shrink-0 text-green" />,
  },
  {
    value: "000-025-075",
    label: "Long-Term Sustainability",
    description: "25% Savings, 75% Investment",
    icon: <Icon type="Sprout" className="h-6 w-6 shrink-0 text-green" />,
  },
  {
    value: "000-050-050",
    label: "Balanced Growth",
    description: "50% Savings, 50% Investment",
    icon: <Icon type="TrendingUp" className="h-6 w-6 shrink-0 text-blue-d1" />,
  },
  {
    value: "025-050-025",
    label: "Short-Term Stability",
    description: "25% Grant, 50% Savings, 25% Investment",
    icon: <Icon type="Banknote" className="h-6 w-6 shrink-0 text-blue-d1" />,
  },
  {
    value: "075-025-000",
    label: "Immediate Impact",
    description: "75% Grant, 25% Savings",
    icon: <Icon type="Zap" className="h-6 w-6 shrink-0 text-amber" />,
  },
];
