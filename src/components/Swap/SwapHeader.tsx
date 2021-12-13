import { useState } from "react";
import useTooltip from "hooks/useTooltip";
import { FaExclamationCircle } from "react-icons/fa";
import { IoSettingsSharp } from "react-icons/io5";

export default function SwapHeader() {
  const { enter, exit, Tooltip } = useTooltip(AdjustSlippage);

  return (
    <div className="flex justify-between items-center font-heading relative text-white">
      <span className="inline-block text-2xl font-bold">
        {" "}
        Buy <span className="uppercase">Halo</span>
      </span>
      <button
        className="bg-transparent p-1 relative"
        onClick={enter}
        onMouseLeave={exit}
      >
        <Tooltip />
        <IoSettingsSharp size="30" />
      </button>
    </div>
  );
}

const AdjustSlippage = () => {
  const slippages: string[] = ["0.5", "1.0", "2.0"];
  const [currentSlippage, setCurrentSlippage] = useState(slippages[0]);
  const [dynamicSlippage, setDynamicSlippage] = useState("20");

  const handleSlippagechange = (e: any) => {
    setDynamicSlippage(e.target.value);
    setCurrentSlippage(e.target.value);
  };

  return (
    <div className="absolute -left-52 xl:-left-32 bg-white font-heading text-angel-grey rounded-md text-sm shadow-sm z-10 p-5 w-80 text-left">
      <p className="text-md font-semibold">
        Slippage tolerance <FaExclamationCircle className="inline" />
      </p>
      <div className="flex justify-start gap-3 w-full mt-2">
        {slippages.map((slippage) => (
          <button
            className={`bg-transparent text-md font-normal border-2 rounded-lg py-1 px-2 ${
              currentSlippage === slippage
                ? "border-angel-blue"
                : "border-gray-300"
            }`}
            onClick={() => setCurrentSlippage(slippage)}
          >
            {slippage}%
          </button>
        ))}
        <div
          className={`bg-transparent text-md font-normal border-2 rounded-lg py-1 px-2 ${
            currentSlippage === dynamicSlippage
              ? "border-angel-blue"
              : "border-gray-300"
          }`}
          onClick={() => setCurrentSlippage(dynamicSlippage)}
        >
          <input
            type="number"
            min="1"
            contentEditable={true}
            onChange={handleSlippagechange}
            defaultValue={dynamicSlippage}
            className="border-0 p-0 h-full w-6 inline bg-transparent focus:border-0 outline-none m-0 slippage-input"
          ></input>
          <span>%</span>
        </div>
      </div>
    </div>
  );
};
