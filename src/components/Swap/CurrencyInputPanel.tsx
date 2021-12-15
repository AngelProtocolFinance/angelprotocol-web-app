import { FaEthereum } from "react-icons/fa";
import { useState, useRef } from "react";
import { Dec } from "@terra-money/terra.js";
import { formatUSD } from "./utils";
import { IoIosArrowDown } from "react-icons/io";

type CurrencyInputProps = {
  label?: string;
  required?: boolean;
  className?: string;
  amount?: string | number;
  usdAmount?: number | Dec;
  assetSymbol?: string;
  balanceString?: string;
  onAmountChange?: (amount: string) => void;
  maxClick?: () => {};
  min?: Dec;
  max?: string | Dec;
  step?: Dec;
  disable: boolean;
};

export default function CurrencyInputPanel({
  label,
  assetSymbol,
  balanceString,
  step,
  min,
  max,
  disable,
  required,
  amount,
  usdAmount,
  onAmountChange,
  ...props
}: CurrencyInputProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [error, setError] = useState<string | boolean>(false);

  const [focused, setFocused] = useState(false);
  const validateInput = () => {
    if (inputRef?.current?.validity.rangeOverflow) {
      setError(`cannot be greater than ${max}`);
    } else if (inputRef?.current?.validity.rangeUnderflow) {
      setError(`cannot be less than ${min}`);
    } else {
      setError(false);
    }
  };
  const onInputChanged = (e: React.ChangeEvent<HTMLInputElement>) => {
    validateInput();
    onAmountChange && onAmountChange(e.target.value); // once this function is called, the bug sets in
  };

  return (
    <div className="currency-input-panel">
      <div className="flex justify-between mb-4">
        <span className="inline-block text-gray-500 font-semibold text-sm capitalize">
          {label}
        </span>
        <span className="inline-block text-gray-500 text-sm capitalize">
          Balance:{" "}
          <span className="font-bold text-grey-800">
            {balanceString || "0"}
          </span>
        </span>
      </div>
      <div className="flex justify-between">
        <button
          className="flex items-center justify-evenly rounded-2xl text-black bg-blue-200 hover:bg-blue-100 focus:bg-blue-100 hover:opacity-300 focus:outline-none disabled:bg-blue-100"
          style={{
            minWidth: "110px",
            height: "33px",
          }}
          disabled={disable}
        >
          <div
            className="currency-name font-bold text-md font-heading"
            onClick={() => inputRef?.current?.focus()}
          >
            <span>{assetSymbol}</span>
          </div>
          {/* <span className="cursor-pointer">
            <IoIosArrowDown className="font-semibold" />
          </span> */}
        </button>
        <div className="flex flex-grow-1 flex-col items-end justify-around">
          <div className="currency-input">
            <input
              {...props}
              ref={inputRef}
              disabled={label?.toLowerCase() === "to" || disable}
              type="number"
              inputMode="decimal"
              placeholder="0.0000"
              autoCorrect="off"
              required={required}
              min={min?.toString()}
              max={max?.toString()}
              step={step?.toFixed(2)}
              value={Number(amount)}
              onChange={onInputChanged}
              className="currency-input text-black font-bold w-full text-right text-lg border-0 outline-none disabled:bg-transparent disabled:text-angel-grey"
            />
          </div>
          {/* format usd amount and display */}
          <p className="usd-price text-xs text-gray-400">
            ~{formatUSD(usdAmount)}
          </p>
        </div>
      </div>
    </div>
  );
}
