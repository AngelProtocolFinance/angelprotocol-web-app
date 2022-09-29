import { FieldError, FieldErrors, FieldValues } from "react-hook-form";

type Props<T extends FieldValues> = {
  errors: FieldErrors<T>;
  name: keyof T & string;
};

export function ErrorMessage<T extends FieldValues>(props: Props<T>) {
  if (!props.errors || !props.errors[props.name]) {
    return null;
  }
  console.log(props.errors);

  const fieldErrors =
    (props.errors[props.name] as unknown as FieldError[]) ?? [];

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
