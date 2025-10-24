import type { TFrequency } from "@better-giving/donation";
import { Field, Label, Radio, RadioGroup } from "@headlessui/react";
import { Check } from "lucide-react";


const styles = {
  icon: "hidden @[21rem]/frequency:block ml-1 group-aria-checked:text-white text-transparent relative bottom-px",
  option:
    "group text-sm border-gray-l3 rounded px-2 @[21rem]/frequency:px-6 border h-[2.625rem] flex items-center justify-center @[21rem]/frequency:justify-start aria-checked:bg-(--accent-primary) aria-checked:text-white aria-checked:border-none select-none",
};

interface Props {
  value: TFrequency;
  onChange: (freq: TFrequency) => void;
  error?: string;
}
export function Frequency({ value, onChange, error }: Props) {
  return (
    <Field className="@container/frequency">
      <Label className="mb-1 block label font-semibold">
        Frequency <span className="text-red">*</span>
      </Label>

      <RadioGroup
        value={value}
        onChange={onChange}
        className="grid grid-cols-2 gap-2 @[21rem]/frequency:flex"
      >
        <Radio value={"recurring" satisfies TFrequency} className={styles.option}>
          <span>Give Monthly</span>
          <Check size={16} className={styles.icon} />
        </Radio>
        <Radio value={"one-time" satisfies TFrequency} className={styles.option}>
          <span>Give Once</span>
          <Check size={16} className={styles.icon} />
        </Radio>
      </RadioGroup>
      {error && <p className="field-err text-left mt-1">{error}</p>}
      <p className="text-gray text-sm my-2">
        <span className="text-gray-d4 font-medium">Monthly donations</span> help
        nonprofits focus on mission and long-term impact, not fundraising.
        Cancel anytime.
      </p>
    </Field>
  );
}
