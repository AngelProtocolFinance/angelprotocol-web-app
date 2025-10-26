import { Field, Label, Radio, RadioGroup, Switch } from "@headlessui/react";
import { PencilIcon } from "lucide-react";
import type { ReactElement } from "react";
import type { TTipFormat } from "../types";

interface Props {
  classes?: string;
  checked: boolean;
  checked_changed: (checked: boolean) => void;
  tip_format: TTipFormat;
  tip_format_changed: (format: TTipFormat) => void;
  custom_tip: ReactElement | undefined;
}

export function TipField({ classes = "", ...p }: Props) {
  return (
    <div
      className={`${classes} flex has-[input:focus-within]:border-b-(--accent-primary) items-center py-1 border-y border-gray-l3 justify-between flex-wrap gap-x-3 gap-y-1`}
    >
      <Field className="group gap-x-1 flex items-center text-sm justify-self-start">
        <Switch
          checked={p.checked}
          onChange={p.checked_changed}
          className="group relative text-xs flex items-center h-[1lh] w-8 cursor-pointer rounded-full bg-gray-l3 p-1 ease-in-out data-checked:bg-(--accent-primary)"
        >
          <span
            aria-hidden="true"
            className="pointer-events-none inline-block h-[0.8lh] aspect-square -translate-x-0.5 rounded-full bg-white transition-transform ease-in-out group-data-checked:translate-x-3.5"
          />
        </Switch>
        <Label className="whitespace-nowrap">
          Support free fundraising tools
        </Label>
      </Field>
      <Field className="flex gap-x-1">
        <RadioGroup
          className="contents"
          value={p.tip_format}
          onChange={p.tip_format_changed}
        >
          <Radio
            className="text-xs outline cursor-pointer outline-gray-l3 data-checked:outline-none data-checked:bg-(--accent-secondary) data-checked:text-(--accent-primary) data-checked:pointer-events-none select-none px-2 py-1 rounded-sm"
            value={"10" satisfies TTipFormat}
          >
            10%
          </Radio>
          <Radio
            className="text-xs outline cursor-pointer outline-gray-l3 data-checked:outline-none data-checked:bg-(--accent-secondary) data-checked:text-(--accent-primary) data-checked:pointer-events-none select-none px-2 py-1 rounded-sm"
            value={"15" satisfies TTipFormat}
          >
            15%
          </Radio>
          <Radio
            className="text-xs outline cursor-pointer outline-gray-l3 data-checked:outline-none data-checked:bg-(--accent-secondary) data-checked:text-(--accent-primary) data-checked:pointer-events-none select-none px-2 py-1 rounded-sm"
            value={"20" satisfies TTipFormat}
          >
            20%
          </Radio>
          <Radio
            className="text-xs outline cursor-pointer outline-gray-l3 data-checked:outline-none data-checked:bg-(--accent-secondary) data-checked:text-(--accent-primary) data-checked:pointer-events-none select-none px-2 py-1 rounded-sm flex-center"
            value={"custom" satisfies TTipFormat}
          >
            <PencilIcon className="inline-block w-3 h-3 " />
          </Radio>
        </RadioGroup>
      </Field>
      <p className="text-gray-d1 text-xs w-full">
        <span className="font-bold text-blue-d1">Better.</span>
        <span className="font-bold text-blue">Giving</span> provide this
        platform free of charge so nonprofits everywhere can receive 100% of
        their gifts. You can help us keep it that way by making a small,
        tax-deductible contribution.
      </p>
      {p.custom_tip}
    </div>
  );
}
