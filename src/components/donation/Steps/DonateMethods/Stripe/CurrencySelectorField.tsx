import {
  FieldValues,
  Path,
  useController,
  useFormContext,
} from "react-hook-form";
import CurrencySelector from "components/CurrencySelector";

type Props<T extends FieldValues> = {
  classes?: { combobox?: string };
  /** Array of ISO 3166-1 alpha-3 codes. */
  currencies: string[];
  disabled?: boolean;
  name: Path<T>;
};

export default function CurrencySelectorField<T extends FieldValues>(
  props: Props<T>
) {
  const { control } = useFormContext<T>();
  const { field, formState } = useController({ control, name: props.name });

  return (
    <CurrencySelector
      classes={props.classes}
      currencies={props.currencies.map((x) => ({ code: x.toUpperCase() }))}
      disabled={!!props.disabled || formState.isSubmitting}
      label="Select your donation currency:"
      onChange={field.onChange}
      value={field.value}
    />
  );
}
