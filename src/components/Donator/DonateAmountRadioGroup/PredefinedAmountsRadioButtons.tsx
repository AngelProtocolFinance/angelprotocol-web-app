import React from "react";
import RadioButton from "./RadioButton";

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
          <RadioButton name="amount" value={amount} onFocus={onFocus} />
          {`$${Number(amount).toFixed(0)}`}
        </label>
      ))}
    </div>
  );
}

export default PredefinedAmountsRadioButtons;
