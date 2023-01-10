import { useEffect, useState } from "react";
import { useErrorContext } from "contexts/ErrorContext";
import { Checkbox } from "components/Checkbox";
import Selector, { OptionType } from "components/Selector";
import { isEmpty } from "helpers";
import { UnexpectedStateError } from "errors/errors";
import { IS_TEST } from "constants/env";
import Split from "./Split";
import useApprovedTokens from "./useApprovedTokens";

type Props = { endowId?: string | number; onChange(url: string): void };

const APP_URL = IS_TEST
  ? "http://localhost:4200"
  : "https://app.angelprotocol.io";

function append(name: string, value: any, condition: boolean): string {
  return condition ? `&${name}=${value}` : "";
}

export default function WidgetUrlGenerator({ endowId, onChange }: Props) {
  const [hideText, setHideText] = useState(false);
  const [hideEndowmentGauges, setHideEndowmentGauges] = useState(false);
  const [hideAdvancedOptions, setHideAdvancedOptions] = useState(false);
  const [unfoldAdvancedOptions, setUnfoldAdvancedOptions] = useState(false);
  const [liquidPercentage, setLiquidPercentage] = useState(0);
  const [availableCurrencies, setAvailableCurrencies] = useState<
    OptionType<string>[]
  >([]);
  const approvedTokens = useApprovedTokens();
  const { handleError } = useErrorContext();

  useEffect(() => {
    if (!endowId) {
      return handleError(new UnexpectedStateError(`Endowment ID is undefined`));
    }

    const param1 = append("hideText", hideText, hideText);
    const param2 = append(
      "hideEndowGauges",
      hideEndowmentGauges,
      hideEndowmentGauges
    );
    const param3 = append(
      "hideAdvOpts",
      hideAdvancedOptions,
      hideAdvancedOptions
    );
    const param4 = append(
      "unfoldAdvOpts",
      unfoldAdvancedOptions,
      unfoldAdvancedOptions
    );
    const param5 = append("liquidPct", liquidPercentage, !!liquidPercentage);
    const param6 = append(
      "availCurrs",
      availableCurrencies.map((x) => x.value).join(","),
      !isEmpty(availableCurrencies)
    );
    onChange(
      `${APP_URL}/${endowId}?apiKey=API_KEY${param1}${param2}${param3}${param4}${param5}${param6}`
    );
  }, [
    endowId,
    hideText,
    hideEndowmentGauges,
    hideAdvancedOptions,
    unfoldAdvancedOptions,
    liquidPercentage,
    availableCurrencies,
    handleError,
    onChange,
  ]);

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
      <span>Available currencies:</span>
      <Selector<string, true>
        options={approvedTokens.map((token) => ({
          label: token,
          value: token,
        }))}
        classes={{ container: "bg-white dark:bg-blue-d6" }}
        multiple
        selectedOptions={availableCurrencies}
        onChange={(newValues) =>
          Array.isArray(newValues)
            ? setAvailableCurrencies(newValues)
            : setAvailableCurrencies([newValues])
        }
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
      <Checkbox id={label} checked={checked} onChange={onChange} />
      <label htmlFor={label} className="cursor-pointer">
        {label}
      </label>
    </div>
  );
}
