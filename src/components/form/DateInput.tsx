import { InputHTMLAttributes, forwardRef } from "react";
import { FieldValues, Path, get, useFormContext } from "react-hook-form";

type Ref = HTMLInputElement;
type Props = Omit<InputHTMLAttributes<HTMLInputElement>, "type"> & {
  error?: string;
};

const NativeDateInput = forwardRef<Ref, Props>(({ error, ...props }, ref) => {
  return (
    <div>
      <input
        {...props}
        ref={ref}
        type="date"
        className="date-input uppercase text-sm relative w-full px-4 py-3 border border-prim rounded-md border-collapse dark:bg-blue-d6"
      />

      {error && (
        <span className="w-full text-xs text-red-l4 dark:text-red-l2">
          {error}
        </span>
      )}
    </div>
  );
});

export default function DateInput<T extends FieldValues>({
  name,
  ...props
}: Omit<Props, "name"> & { name: Path<T> }) {
  const {
    register,
    formState: { errors },
  } = useFormContext<T>();
  return (
    <NativeDateInput {...register(name)} {...props} error={get(errors, name)} />
  );
}
