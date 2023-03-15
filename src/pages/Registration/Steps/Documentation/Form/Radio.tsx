import { useFormContext } from "react-hook-form";
import { FormValues as FV } from "../types";

export function Radio({ value }: { value: FV["isKYCRequired"] }) {
  const {
    register,
    formState: { isSubmitting },
  } = useFormContext<FV>();
  const id = `__${value}`;
  return (
    <div className="flex items-center gap-2.5">
      <input
        id={id}
        type="radio"
        disabled={isSubmitting}
        {...register("isKYCRequired")}
        className="radio"
        value={value}
      />
      <label htmlFor={id} className="text-xs cursor-pointer">
        {value}
      </label>
    </div>
  );
}
