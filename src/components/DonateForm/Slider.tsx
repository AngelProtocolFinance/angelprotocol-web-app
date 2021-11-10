import { Values } from "components/Donater/types";
import { useFormContext } from "react-hook-form";

export default function Slider() {
  const { register, watch } = useFormContext<Values>();
  const amount = Number(watch("amount"));
  const min_liq = watch("min_liq");
  const max_liq = watch("max_liq");
  return (
    <div className="my-auto select-none">
      <input
        disabled={!amount || max_liq === 0}
        type="range"
        {...register("split_liq")}
        min={min_liq}
        max={max_liq}
      />
    </div>
  );
}
