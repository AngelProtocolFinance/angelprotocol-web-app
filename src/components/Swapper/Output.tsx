import { currency_icons, currency_text, denoms } from "constants/currency";
import { useFormContext } from "react-hook-form";
import { Values } from "./types";

export default function Output() {
  const { watch } = useFormContext<Values>();

  const return_amount = watch("return_amount");
  const is_buy = watch("is_buy");
  const currency = currency_text[is_buy ? denoms.uhalo : denoms.uusd];
  const icon = currency_icons[is_buy ? denoms.uhalo : denoms.uusd];

  return (
    <div className="grid mb-2">
      <div className="flex justify-between">
        <label
          htmlFor="amount"
          className="flex items-center justify-center text-angel-blue uppercase font-heading mb-2 rounded-md"
        >
          <img className="w-6 h-6 mr-1 object-contain" src={icon} />
          <span className="block font-bold">{is_buy ? "HALO" : "UST"}</span>
        </label>
        <p className="text-angel-blue uppercase text-xs font-semibold font-heading">
          You will receive
        </p>
      </div>

      <p className="text-right p-1 pl-0 outline-none border-b border-angel-blue border-opacity-20 text-angel-grey text-lg">
        <span className="">{return_amount}</span>
        <span className="text-xs font-semibold ml-1">{currency}</span>
      </p>
    </div>
  );
}
