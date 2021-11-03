import { Values } from "components/Donater/schema";
import { useFormContext } from "react-hook-form";

export default function Slider() {
  const { register, watch } = useFormContext<Values>();
  const amount = Number(watch("amount"));
  return (
    <div className="my-auto">
      <input
        disabled={!amount}
        type="range"
        {...register("split")}
        min="50"
        max="100"
      />
    </div>
  );
}
