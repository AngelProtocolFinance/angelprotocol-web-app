import {
  currency_icons,
  currency_text,
  denoms,
  MAIN_DENOM,
} from "constants/currency";
import { useFormContext } from "react-hook-form";
import { SwapValues } from "./types";

export default function Output() {
  const { watch } = useFormContext<SwapValues>();

  const return_amount = watch("return_amount");
  const is_buy = watch("is_buy");
  const icon = currency_icons[is_buy ? denoms.uhalo : MAIN_DENOM];

  return (
    <div className="grid grid-cols-a1 bg-light-grey text-angel-grey p-3 rounded-md shadow-inner-white-grey mb-2">
      <p className="text-angel-grey uppercase text-md font-semibold font-heading ml-1">
        To:
      </p>
      <div className="row-start-2 flex items-center justify-center text-angel-grey text-lg uppercase font-heading rounded-md">
        <img
          className={`${is_buy ? "w-9 h-9" : "w-10 h-10"} mr-1 object-contain`}
          src={icon}
          alt=""
        />
        <span className="block font-bold text-2xl">
          {is_buy ? currency_text[denoms.uhalo] : currency_text[MAIN_DENOM]}
        </span>
      </div>

      <div className="row-start-2 text-right p-2 text-angel-grey text-2xl w-full">
        {return_amount}
      </div>
    </div>
  );
}
