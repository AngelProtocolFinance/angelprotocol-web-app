import { FaEthereum } from "react-icons/fa";
import { IoIosArrowDown } from "react-icons/io";
import { useState, useRef } from "react";

type CurrencyInputProps = {
  label?: string;
  required?: boolean;
  className?: string;
  amount?: number;
  usdAmount?: number;
  assetSymbol?: string;
  balanceString?: string;
  onAmountChange?: (x: string) => {};
  maxClick?: () => {};
  min?: number;
  max?: number;
  step?: number;
};

export default function CurrencyInputPanel({
  label,
  assetSymbol,
  balanceString,
  step,
  min,
  max,
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
    console.log(inputRef?.current?.validity?.valid);
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

    onAmountChange && onAmountChange(e.target.value);
  };

  return (
    <div className="currency-input-panel">
      <div className="flex justify-between mb-4">
        <span className="inline-block text-gray-500 text-sm capitalize">
          currency
        </span>
        <span className="inline-block text-gray-500 text-sm capitalize">
          Balance: {balanceString}
        </span>
      </div>
      <div className="flex justify-between">
        <button
          className="flex items-center justify-evenly rounded-2xl  text-black bg-blue-200 hover:bg-blue-100 focus:bg-blue-100 hover:opacity-300 focus:outline-none"
          style={{
            minWidth: "110px",
            height: "33px",
          }}
        >
          <div className="currency-ico">
            <FaEthereum />
          </div>
          <div className="currency-name font-bold text-md font-heading">
            <span>{assetSymbol || "Token"}</span>
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
              type="number"
              inputMode="decimal"
              placeholder="0.0000"
              autoCorrect="off"
              required={required}
              min={min}
              max={max}
              step={step}
              value={amount}
              onFocus={() => setFocused(true)}
              onBlur={() => setFocused(false)}
              onChange={onInputChanged}
              className="currency-input text-black font-bold w-full text-right text-lg border-0 outline-none"
            />
          </div>
          {/* format usd amount and display */}
          <p className="usd-price text-xs text-gray-400">~$1,584.25</p>
        </div>
      </div>
    </div>
  );
}
