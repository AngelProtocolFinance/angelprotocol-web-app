import {
  DeepRequired,
  FieldError,
  FieldErrorsImpl,
  FieldValues,
  useFormContext,
} from "react-hook-form";

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

  const fieldErrors = getUniqueFieldErrors(errors[props.name]);

  return (
    <div className="flex flex-col gap-1 items-center">
      {fieldErrors.map((x) => (
        <p className="w-full text-xs text-failed-red text-center" key={x.type}>
          {x.message}
        </p>
      ))}
    </div>
  );
}

function getUniqueFieldErrors<T>(
  errors: FieldErrorsImpl<DeepRequired<T>>[keyof T & string]
): FieldError[] {
  const fieldErrors = (errors as unknown as FieldError[]) ?? [];

  return fieldErrors.reduceRight(
    (prev, curr) =>
      prev.some((x) => x.type === curr.type) ? prev : prev.concat(curr),
    [fieldErrors[0]]
  );
}
