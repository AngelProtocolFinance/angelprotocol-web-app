import { useFormContext } from "react-hook-form";
import { SwapValues } from "./types";

export default function Slippage() {
  return (
    <div className="flex items-baseline justify-end text-angel-grey divide-x">
      <p className="text-2xs uppercase font-bold font-heading mr-2">Slippage</p>
      <Option value="0.5" id={"slip_1"} />
      <Option value="1.0" id={"slip_2"} />
      <Option value="1.5" id={"slip_3"} />
      <Option value="2.0" id={"slip_4"} />
    </div>
  );
}

type OptionProps = {
  value: string;
  id: string;
};
function Option(props: OptionProps) {
  const { register, watch } = useFormContext<SwapValues>();
  const slippage = watch("slippage");
  const is_active = slippage === props.value;

  return (
    <div className="flex items-center">
      <label
        htmlFor={props.id}
        className={`px-2 py-1 font-mono font-semibold cursor-pointer text-xs 
        hover:bg-angel-blue hover:bg-opacity-10 ${
          is_active
            ? "bg-angel-blue bg-opacity-10 shadow-inner-white-grey rounded-sm"
            : ""
        }`}
      >
        {props.value}%
      </label>
      <input
        className="w-0 h-0"
        type="radio"
        {...register("slippage")}
        value={props.value}
        id={props.id}
      />
    </div>
  );
}
