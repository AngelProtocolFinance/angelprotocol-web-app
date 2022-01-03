import { FastField, useFormikContext } from "formik";
import React, { useCallback, useRef } from "react";
import { Values } from "../types";
import OtherAmountRadioButton from "./OtherAmountRadioButton";

type Props = {
  amounts: string[];
};

// Note: If at any point there comes a need to pull this component out and make it a shared one, know
// that this component uses the surrounding Formik fields to initialize and manage its radio buttons.
function DonateAmountRadioGroup({ amounts }: Props) {
  const { values, setFieldValue } = useFormikContext<Values>();
  const otherAmountInputRef = useRef<HTMLInputElement>();

  const resetAmount = useCallback(() => setFieldValue("amount", ""), []);

  const resetOtherAmount = useCallback(
    () => setFieldValue("otherAmount", ""),
    []
  );

  const focusOtherAmountInput = useCallback(
    () => otherAmountInputRef.current?.focus(),
    []
  );

  return (
    <div className="flex flex-col w-1/2 gap-5 justify-center xl:justify-start">
      <p className="font-semibold">Choose the amount of your donation:</p>
      <div className="flex flex-col gap-2 2xl:gap-4 xl:flex-row">
        {amounts.map((amount) => (
          <label
            key={amount}
            className="cursor-pointer font-semibold flex items-center"
          >
            <FastField
              type="radio"
              name="amount"
              value={amount}
              className="mr-1 cursor-pointer"
              onFocus={resetOtherAmount}
            />
            {`$${Number(amount).toFixed(0)}`}
          </label>
        ))}
      </div>
      <OtherAmountRadioButton
        onClick={focusOtherAmountInput}
        onFocus={resetAmount}
        checked={
          !!values.otherAmount ||
          otherAmountInputRef.current === document.activeElement
        }
        innerRef={otherAmountInputRef}
      />
    </div>
  );
}

export default DonateAmountRadioGroup;
