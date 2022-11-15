import { useFormContext } from "react-hook-form";
import { FormValues as FV } from "./types";

const fieldName: keyof FV = "isKYCRequired";
export function Radio({ value }: { value: FV["isKYCRequired"] }) {
  const { register } = useFormContext<FV>();
  const id = `__${value}`;
  return (
    <div className="flex items-center gap-2.5">
      <input
        id={id}
        type="radio"
        {...register(fieldName)}
        className="cursor-pointer appearance-none h-4 relative aspect-square border rounded-full before:content-[''] before:h-2.5 before:aspect-square before:absolute-center before:rounded-full checked:before:bg-orange"
        value={value}
      />
      <label htmlFor={id} className="text-xs cursor-pointer">
        {value}
      </label>
    </div>
  );
}
