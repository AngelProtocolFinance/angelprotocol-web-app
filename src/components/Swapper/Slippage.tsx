import { useFormContext } from "react-hook-form";
import { Values } from "./types";

export default function Slippage() {
  return (
    <div className="bg-angel-blue bg-opacity-10 rounded-md p-1.5 flex items-center text-angel-grey gap-1">
      <p className="text-2xs uppercase font-bold font-heading mr-auto">
        slippage tolerance
      </p>
      <Option value="0.1" id={"slip_1"} />
      <Option value="0.5" id={"slip_2"} />
      <Option value="1.0" id={"slip_3"} />
      <Option value="2.0" id={"slip_4"} />
    </div>
  );
}

type OptionProps = {
  value: string;
  id: string;
};
function Option(props: OptionProps) {
  const { register, watch } = useFormContext<Values>();
  const slippage = watch("slippage");
  const is_active = slippage === props.value;

  return (
    <div className="flex items-center">
      <label
        htmlFor={props.id}
        className={`cursor-pointer p-0.5 pl-2 pr-1 rounded-md text-2xs font-bold font-heading ${
          is_active
            ? "border-2 border-angel-blue border-opacity-50 bg-angel-blue text-white"
            : "border-2 border-angel-grey border-opacity-30"
        }`}
      >
        {props.value} %
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
