import { FastField } from "formik";
import React from "react";

const amounts = [
  "5.000000",
  "20.000000",
  "50.000000",
  "100.000000",
  "1000.000000",
];

type Props = { onFocus: () => void };

function PredefinedAmountsRadioButtons({ onFocus }: Props) {
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
            className="mr-1 cursor-pointer w-4 h-4 2xl:w-6 2xl:h-6 rounded-full appearance-none bg-white-grey"
            onFocus={onFocus}
          />
          {`$${Number(amount).toFixed(0)}`}
        </label>
      ))}
    </div>
  );
}

export default PredefinedAmountsRadioButtons;
