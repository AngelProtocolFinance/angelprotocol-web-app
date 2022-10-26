import { useFormContext } from "react-hook-form";
import { DonateValues } from "../../../types";

export default function Slider() {
  const {
    register,
    formState: { isValid },
  } = useFormContext<DonateValues>();

  return (
    <div className="my-2 select-none">
      <input
        disabled={!isValid}
        type="range"
        {...register("pctLiquidSplit")}
        min={0}
        max={100}
        className="slider"
      />
    </div>
  );
}
