import { currency_icons, denoms } from "constants/currency";
import { useFormContext } from "react-hook-form";
import { Values } from "./types";

export default function Output() {
  const { watch } = useFormContext<Values>();

  const return_amount = watch("return_amount");
  const is_buy = watch("is_buy");
  const icon = currency_icons[is_buy ? denoms.uhalo : denoms.uusd];

  return (
    <div className="grid m-2 h-25">
      <div className="flex flex-row justify-between items-center p-2 border-b-2 border-t-2 border-angel-blue border-opacity-20 text-angel-grey">
        <div className="flex flex-col">
          <p className="text-angel-grey uppercase text-md font-semibold font-heading mt-2 mb-2">
            To:
          </p>
          <label
            htmlFor="amount"
            className="flex items-center justify-center text-angel-grey text-lg uppercase font-heading mb-2 rounded-md"
          >
            <img
              className={`${
                is_buy ? "w-9 h-9" : "w-10 h-10"
              } mr-1 object-contain`}
              src={icon}
              alt=""
            />
            <span className="block font-bold text-2xl">
              {is_buy ? "HALO" : "UST"}
            </span>
          </label>
        </div>
        <div className="text-right py-2 text-angel-grey text-2xl w-2/3 mt-8">
          {return_amount}
        </div>
      </div>
    </div>
  );
}
