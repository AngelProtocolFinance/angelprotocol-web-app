import { Values } from "components/Donater/types";
import { denoms, currency_text, currency_icons } from "constants/currency";
import { useFormContext } from "react-hook-form";
import { memo } from "react";
import useTooltip from "hooks/useTooltip";

type Props = {
  currency: denoms.uusd | denoms.btc | denoms.ether;
  withTooltip?: true;
};
function Currency(props: Props) {
  const { enter, exit, Tooltip } = useTooltip(Tooltip_);
  const { register, watch } = useFormContext<Values>();
  const isActive = watch("currency") === props.currency;
  return (
    <div
      onMouseEnter={enter}
      onMouseLeave={exit}
      className={`${
        props.withTooltip ? "relative cursor-pointer" : ""
      } flex items-center ${
        isActive ? "bg-angel-blue bg-opacity-20" : ""
      } p-0.5 pr-2 rounded-sm`}
    >
      <input
        disabled={props.withTooltip}
        id={props.currency}
        {...register("currency")}
        value={props.currency}
        type="radio"
        className="w-0 h-0"
      />
      <label
        htmlFor={props.currency}
        className={`uppercase flex items-center text-sm`}
      >
        <img
          src={currency_icons[props.currency]}
          alt=""
          className="w-4 h-4 object-contain"
        />
        <span
          className={`${
            props.withTooltip ? "text-grey-accent" : "text-angel-grey"
          } ml-0.5`}
        >
          {currency_text[props.currency]}
        </span>
      </label>
      {props.withTooltip && <Tooltip />}
    </div>
  );
}

export default memo(Currency);

function Tooltip_() {
  return (
    <span className="fixed bg-white text-angel-grey p-1.5 rounded-md text-sm shadow-md z-10">
      comming soon!
    </span>
  );
}
