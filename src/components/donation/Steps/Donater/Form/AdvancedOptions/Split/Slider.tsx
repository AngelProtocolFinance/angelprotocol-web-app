import { useFormContext } from "react-hook-form";
import { DonateValues } from "../../../types";

export default function Slider({ classes = "" }: { classes?: string }) {
  const {
    register,
    formState: { isValid, errors },
  } = useFormContext<DonateValues>();
  console.log("errors", errors);

  return (
    <div className={`${classes} select-none`}>
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
