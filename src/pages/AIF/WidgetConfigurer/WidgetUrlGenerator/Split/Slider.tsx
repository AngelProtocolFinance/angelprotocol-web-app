import { useFormContext } from "react-hook-form";
import { FormValues } from "../schema";

type Props = {
  className?: string;
};

export default function Slider({ className = "" }: Props) {
  const { register } = useFormContext<FormValues>();
  return (
    <div className={`${className} select-none`}>
      <input
        className="slider"
        {...register("liquidPercentage")}
        min={0}
        max={100}
        type="range"
      />
    </div>
  );
}
