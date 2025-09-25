import { Radio, RadioGroup } from "@headlessui/react";
import { Check } from "lucide-react";
import type { FormValues } from "./types";

type Freq = FormValues["frequency"];

const styles = {
  icon: "hidden @[21rem]/frequency:block ml-1 group-aria-checked:text-white text-transparent relative bottom-px",
  option:
    "group border-gray-l3 rounded-lg px-2 @[21rem]/frequency:px-6 border h-[2.625rem] flex items-center justify-center @[21rem]/frequency:justify-start aria-checked:bg-(--accent-primary) aria-checked:text-white aria-checked:border-none select-none",
};

interface Props {
  value: Freq;
  onChange: (freq: Freq) => void;
  error?: string;
}
export function Frequency({ value, onChange, error }: Props) {
  return (
    <RadioGroup
      value={value}
      onChange={onChange}
      className="@container/frequency"
    >
      <label className="mb-2 block font-semibold font-heading">
        Frequency <span className="text-red">*</span>
      </label>
      <div className="grid grid-cols-2 gap-2 @[21rem]/frequency:flex">
        <Radio value={"recurring" satisfies Freq} className={styles.option}>
          <span>Give Monthly</span>
          <Check size={16} className={styles.icon} />
        </Radio>
        <Radio value={"one-time" satisfies Freq} className={styles.option}>
          <span>Give Once</span>
          <Check size={16} className={styles.icon} />
        </Radio>
      </div>
      {error && <p className="field-err text-left mt-1">{error}</p>}
      <p className="text-gray mt-3">
        <span className="text-gray-d4 font-medium">Monthly donations</span> help
        nonprofits focus on mission and long-term impact, not fundraising.
        Cancel anytime.
      </p>
    </RadioGroup>
  );
}
