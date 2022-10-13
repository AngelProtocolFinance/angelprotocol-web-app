import {
  DeepRequired,
  FieldError,
  FieldErrorsImpl,
  FieldValues,
  useFormContext,
} from "react-hook-form";

type Props<T extends FieldValues> = {
  name: keyof T & string;
  colors?: { light: string; dark: string };
};

export function ErrorMessage<T extends FieldValues>({
  name,
  colors = { light: "red-l1", dark: "red-l1" },
}: Props<T>) {
  const {
    formState: { errors },
  } = useFormContext<T>();

  if (!errors || !errors[name]) {
    return null;
  }

  const fieldErrors = Array.isArray(errors[name])
    ? getUniqueFieldErrors(errors[name])
    : [errors[name] as FieldError];

  return (
    <div className="flex flex-col gap-1 items-center">
      {fieldErrors.map((x) => (
        <p
          key={x.type}
          className={`w-full text-xs text-${colors.light.trim()} dark:text-${colors.dark.trim()} text-center`}
        >
          {x.message}
        </p>
      ))}
    </div>
  );
}

function getUniqueFieldErrors<T>(
  errors: FieldErrorsImpl<DeepRequired<T>>[keyof T & string]
): FieldError[] {
  // the way hookforms works with array values is that it sets the `errors` values by the index of the inserted value.
  // example:
  // - input file1 -> valid, file2 -> invalid
  // - errors value: [[0]: undefined, [1]: {message: "invalid", type: "sometype"}]
  // because the first file was valid, the first element in the `errors` array is `undefined`,
  // so we filter those out for easier handling
  const fieldErrors = ((errors as unknown as FieldError[]) ?? []).filter(
    (err) => !!err
  );

  return fieldErrors.reduceRight(
    (prev, curr) =>
      prev.some((x) => x.type === curr.type) ? prev : prev.concat(curr),
    [fieldErrors[0]]
  );
}
