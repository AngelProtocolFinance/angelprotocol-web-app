import { Radio, RadioGroup } from "@headlessui/react";
import Icon from "components/Icon";
import type { FiatPaymentFrequency } from "types/aws";
import type { FormValues as FV } from "./types";

type Freq = FV["frequency"];

const styles = {
  icon: "hidden @[21rem]/frequency:block text-[1.3rem] ml-1 group-aria-checked:text-white text-transparent relative bottom-px",
  option:
    "group border-gray-l3 rounded-lg px-2 @[21rem]/frequency:px-6 border h-[2.625rem] flex items-center justify-center @[21rem]/frequency:justify-start aria-checked:bg-[--accent-primary] aria-checked:text-white aria-checked:border-none select-none",
};

interface Props {
  value: FiatPaymentFrequency;
  onChange: (freq: FiatPaymentFrequency) => void;
  error?: string;
}
export default function Frequency({ value, onChange, error }: Props) {
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
        <Radio value={"subscription" satisfies Freq} className={styles.option}>
          <span>Give Monthly</span>
          <Icon type="Check" className={styles.icon} />
        </Radio>
        <Radio value={"one-time" satisfies Freq} className={styles.option}>
          <span>Give Once</span>
          <Icon type="Check" className={styles.icon} />
        </Radio>
      </div>
      {error && <p className="field-error static text-left mt-1">{error}</p>}
      <p className="text-navy-l1 mt-3">
        <span className="text-navy-d4 font-medium">Monthly donations</span> help
        nonprofits focus on mission and long-term impact, not fundraising.
        Cancel anytime.
      </p>
    </RadioGroup>
  );
}
