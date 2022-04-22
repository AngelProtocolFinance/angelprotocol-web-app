import { useFormContext } from "react-hook-form";
import { useGetter } from "store/accessors";
import { DonateValues } from "components/Transactors/Donater/types";

export default function Slider() {
  const { form_error } = useGetter((state) => state.transaction);
  const { register, watch } = useFormContext<DonateValues>();
  const amount = Number(watch("amount"));
  const min_liq = watch("min_liq");
  const max_liq = watch("max_liq");

  return (
    <div className="my-2 select-none">
      <input
        hidden={max_liq === 0}
        disabled={!amount || form_error !== null}
        type="range"
        {...register("split_liq")}
        min={min_liq}
        max={max_liq}
        className="w-full"
      />
    </div>
  );
}
