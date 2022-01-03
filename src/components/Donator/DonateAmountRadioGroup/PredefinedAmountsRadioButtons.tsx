import { FastField } from "formik";
import React from "react";

type Props = { amounts: string[]; onFocus: () => void };

function PredefinedAmountsRadioButtons({ amounts, onFocus }: Props) {
  return (
    <div className="flex flex-col gap-2 2xl:gap-4 xl:flex-row">
      {amounts.map((amount) => (
        <label
          key={amount}
          className="cursor-pointer font-semibold flex items-center max-w-max"
        >
          <FastField
            type="radio"
            name="amount"
            value={amount}
            className="mr-1 cursor-pointer"
            onFocus={onFocus}
          />
          {`$${Number(amount).toFixed(0)}`}
        </label>
      ))}
    </div>
  );
}

export default PredefinedAmountsRadioButtons;
