import { Field, Label, Radio, RadioGroup } from "@headlessui/react";
import Icon from "components/Icon";
import type { Allocation } from "types/aws";

function toAlloc(input: string): Allocation {
  const [a, b, c] = input.split("-").map((str) => Number.parseInt(str, 10));
  return { cash: a, liq: b, lock: c };
}

function toKey(input: Allocation): string {
  const padNumber = (num: number): string => num.toString().padStart(3, "0");
  return `${padNumber(input.cash)}-${padNumber(input.liq)}-${padNumber(
    input.lock
  )}`;
}

interface Props {
  value: Allocation;
  onChange: (val: Allocation) => void;
}
export function AllocationOptions(props: Props) {
  const options = [
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
      icon: (
        <Icon type="TrendingUp" className="h-6 w-6 shrink-0 text-blue-d1" />
      ),
    },
    {
      value: "025-050-025",
      label: "Short-Term Stability",
      description: "25% Grant, 50% Savings, 25% Investment",
      icon: <Icon type="Banknote" className="h-6 w-6 shrink-0 text-blue-d1" />,
    },
    {
      value: "100-000-000",
      label: "Immediate Impact",
      description: "100% Grant",
      icon: <Icon type="Zap" className="h-6 w-6 shrink-0 text-amber" />,
    },
  ];

  return (
    <RadioGroup
      value={toKey(props.value)}
      onChange={(v) => props.onChange(toAlloc(v))}
      className="grid gap-y-2"
    >
      {options.map((option) => (
        <Field key={option.value} className="flex items-center group">
          <Radio value={option.value} />
          <Label className="flex flex-1 gap-x-3 items-center group-has-[[data-checked]]:bg-blue-l4 border border-gray-l4 group-has-[[data-checked]]:border-blue-l4 px-2 py-4 rounded-lg">
            {option.icon}
            <div className="grid gap-y-2">
              <p className="text-sm font-medium leading-none">{option.label}</p>
              <p className="text-sm text-navy-l1">{option.description}</p>
            </div>
          </Label>
        </Field>
      ))}
    </RadioGroup>
  );
}
