import { useFormContext } from "react-hook-form";
import { DonateValues } from "../../../types";

export default function Slider() {
  const {
    register,
    formState: { errors },
  } = useFormContext<DonateValues>();

  return (
    <div className="my-2 select-none">
      <input
        disabled={!!errors["token"]?.amount}
        type="range"
        {...register("liquidSplit")}
        min={0}
        max={100}
        className="w-full"
      />
    </div>
  );
}
