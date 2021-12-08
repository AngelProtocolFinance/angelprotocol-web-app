import { FaEthereum } from "react-icons/fa";
import { IoIosArrowDown } from "react-icons/io";

export default function CurrencyInputPanel() {
  return (
    <div className="currency-input-panel">
      <div className="flex justify-between mb-4">
        <span className="inline-block text-gray-500 text-sm capitalize">
          currency
        </span>
        <span className="inline-block text-gray-500 text-sm capitalize">
          Balance: 0.0000
        </span>
      </div>
      <div className="flex justify-between">
        <button
          className="flex items-center justify-evenly rounded-2xl bg-blue-200 hover:bg-blue-100 focus:bg-blue-100 hover:opacity-300 focus:outline-none"
          style={{
            minWidth: "110px",
            height: "33px",
          }}
        >
          <div className="currency-ico">
            <FaEthereum />
          </div>
          <div className="currency-name font-bold text-md font-heading">
            <span>HALO</span>
          </div>
          <span className="cursor-pointer">
            <IoIosArrowDown className="font-semibold" />
          </span>
        </button>
        <div className="flex flex-grow-1 flex-col items-end justify-around">
          <div className="currency-input">
            <input
              type="number"
              inputMode="decimal"
              placeholder="0.0000"
              autoCorrect="off"
              className="currency-input font-bold w-full text-right text-lg border-0 outline-none"
            />
          </div>
          <p className="usd-price text-xs text-gray-400">~$1,584.25</p>
        </div>
      </div>
    </div>
  );
}
