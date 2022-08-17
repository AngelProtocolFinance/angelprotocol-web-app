import { memo } from "react";
import { useFormContext } from "react-hook-form";
import { FundSendValues } from "pages/Admin/types";

function Currency(props: { currency: string; text: string; icon: string }) {
  const { register, watch } = useFormContext<FundSendValues>();
  const isActive = watch("currency") === props.currency;

  return (
    <div
      className={`cursor-pointer flex items-center ${
        isActive ? "bg-angel-blue/10 shadow-inner-white-grey" : ""
      } p-2 rounded-md`}
    >
      <input
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
        <img src={props.icon} alt="" className="w-4 h-4 object-contain" />
        <span className={`ml-0.5`}>{props.text}</span>
      </label>
    </div>
  );
}

export default memo(Currency);
