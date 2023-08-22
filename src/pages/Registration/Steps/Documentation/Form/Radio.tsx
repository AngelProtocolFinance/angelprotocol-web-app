import { useFormContext } from "react-hook-form";
import { FormValues as FV } from "../types";

type Props<Field extends keyof FV> = {
  name: Field;
  value: FV[Field] extends string ? FV[Field] : never;
};

export function Radio<Field extends keyof FV>({ name, value }: Props<Field>) {
  const {
    register,
    formState: { isSubmitting },
  } = useFormContext<FV>();
  const id = `__${name}__${value}`;
  return (
    <div className="flex items-center gap-2.5">
      <input
        id={id}
        type="radio"
        disabled={isSubmitting}
        {...register(name)}
        className="radio"
        value={value}
      />
      <label htmlFor={id} className="text-xs cursor-pointer">
        {value}
      </label>
    </div>
  );
}
