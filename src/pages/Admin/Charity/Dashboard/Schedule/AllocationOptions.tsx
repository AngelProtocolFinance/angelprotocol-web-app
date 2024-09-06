import { Field, Label, Radio, RadioGroup } from "@headlessui/react";
import type { Allocation } from "types/aws";
import { allocationOptions, toAlloc, toKey } from "./common";

interface Props {
  value: Allocation;
  onChange: (val: Allocation) => void;
}
export function AllocationOptions(props: Props) {
  return (
    <RadioGroup
      value={toKey(props.value)}
      onChange={(v) => props.onChange(toAlloc(v))}
      className="grid gap-y-2"
    >
      {allocationOptions.map((option) => (
        <Field key={option.value} className="flex items-center group ">
          <Radio value={option.value} />
          <Label className="flex flex-1 gap-x-3 items-center group-has-[[data-checked]]:bg-blue-l4 border border-gray-l4 group-has-[[data-checked]]:border-blue-l4 group-hover:ring-1 group-hover:border-blue-l3 px-2 py-4 rounded-lg">
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
