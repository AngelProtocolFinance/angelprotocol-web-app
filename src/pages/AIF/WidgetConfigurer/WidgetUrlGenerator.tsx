import { useState } from "react";
import { Checkbox } from "components/Checkbox";
import Split from "./Split";

export default function WidgetUrlGenerator() {
  const [hideText, setHideText] = useState(false);
  const [hideEndowmentGauges, setHideEndowmentGauges] = useState(false);
  const [hideAdvancedOptions, setHideAdvancedOptions] = useState(false);
  const [unfoldAdvancedOptions, setUnfoldAdvancedOptions] = useState(false);
  const [liquidPercentage, setLiquidPercentage] = useState(0);
  const [availableCurrencies, setAvailableCurrencies] = useState<string[]>([]);

  return (
    <div className="flex flex-col gap-2 w-4/5 sm:text-lg font-normal font-body">
      <CheckboxField
        checked={hideText}
        label="Hide text"
        onChange={() => setHideText((prev) => !prev)}
      />
      <CheckboxField
        checked={hideEndowmentGauges}
        label="Hide endowment gauges"
        onChange={() => setHideEndowmentGauges((prev) => !prev)}
      />
      <CheckboxField
        checked={hideAdvancedOptions}
        label='Hide "advanced options"'
        onChange={() => setHideAdvancedOptions((prev) => !prev)}
      />
      <CheckboxField
        checked={unfoldAdvancedOptions}
        label='Unfold "advanced options" by default'
        onChange={() => setUnfoldAdvancedOptions((prev) => !prev)}
      />
      <span>Define split value by default:</span>
      <Split
        liquidPercentage={liquidPercentage}
        onChange={(newValue) => setLiquidPercentage(newValue)}
      />
    </div>
  );
}

function CheckboxField({
  checked,
  label,
  onChange,
}: {
  checked: boolean;
  label: string;
  onChange(): void;
}) {
  return (
    <div className="flex items-center gap-2 w-fit cursor-pointer">
      <Checkbox checked={checked} onChange={onChange} />
      {label}
    </div>
  );
}
