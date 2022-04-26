import { memo } from "react";
import { useFormContext } from "react-hook-form";
import { DonateValues } from "@types-component/donater";
import useTooltip from "hooks/useTooltip";
import { currency_icons, currency_text } from "constants/currency";

type Props = {
  currency: DonateValues["currency"];
  withTooltip?: true;
};

function Currency(props: Props) {
  const { enter, exit, Tooltip } = useTooltip(Tooltip_);
  const { register, watch } = useFormContext<DonateValues>();
  const isActive = watch("currency") === props.currency;

  return (
    <div
      onMouseEnter={enter}
      onMouseLeave={exit}
      className={`${
        props.withTooltip ? "relative cursor-pointer" : ""
      } flex items-center ${
        isActive ? "bg-angel-blue/10 shadow-inner-white-grey" : ""
      } p-2 rounded-md`}
    >
      <input
        disabled={props.withTooltip}
        id={props.currency}
        {...register("currency")}
        value={props.currency}
        type="radio"
        className="w-0 h-0 appearance-none"
      />
      <label
        htmlFor={props.currency}
        className="uppercase flex items-center text-sm cursor-pointer"
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
      coming soon!
    </span>
  );
}
