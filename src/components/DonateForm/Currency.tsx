import { Values } from "components/Donater/types";
import { denoms, currency_text, currency_icons } from "constants/currency";
import { useFormContext } from "react-hook-form";
import { memo } from "react";

type Props = { currency: denoms.uusd | denoms.btc | denoms.ether };
function Currency(props: Props) {
  const { register, watch } = useFormContext<Values>();
  const isActive = watch("currency") === props.currency;
  return (
    <div
      className={`flex items-center ${
        isActive ? "bg-angel-blue bg-opacity-20" : ""
      } p-0.5 pr-2 rounded-sm`}
    >
      <input
        id={props.currency}
        {...register("currency")}
        value={props.currency}
        type="radio"
        className="w-0 h-0"
      />
      <label
        htmlFor={props.currency}
        className="uppercase flex items-center text-sm"
      >
        <img
          src={currency_icons[props.currency]}
          alt=""
          className="w-4 h-4 object-contain"
        />
        <span className="text-angel-grey ml-0.5">
          {currency_text[props.currency]}
        </span>
      </label>
    </div>
  );
}

export default memo(Currency);
