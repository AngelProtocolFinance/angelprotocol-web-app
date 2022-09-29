import { FieldError, FieldValues, useFormContext } from "react-hook-form";

type Props<T extends FieldValues> = {
  name: keyof T & string;
};

export function ErrorMessage<T extends FieldValues>(props: Props<T>) {
  const {
    formState: { errors },
  } = useFormContext<T>();

  if (!errors || !errors[props.name]) {
    return null;
  }

  const fieldErrors = (errors[props.name] as unknown as FieldError[]) ?? [];

  return (
    <div className="flex flex-col gap-1 items-center">
      {fieldErrors
        .reduceRight(
          (prev, curr) =>
            prev.some((x) => x.type === curr.type) ? prev : prev.concat(curr),
          [fieldErrors[0]]
        )
        .map((x) => (
          <p
            className="w-full text-xs text-failed-red text-center"
            key={x.type}
          >
            {x.message}
          </p>
        ))}
    </div>
  );
}
