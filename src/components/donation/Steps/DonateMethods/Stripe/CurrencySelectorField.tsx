import {
  FieldValues,
  Path,
  useController,
  useFormContext,
} from "react-hook-form";
import CurrencySelector, { Currency } from "components/CurrencySelector";

type Props<T extends FieldValues> = {
  classes?: { combobox?: string };
  currencies: Currency[];
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
      value={field.value}
      onChange={field.onChange}
      classes={props.classes}
      currencies={props.currencies}
      disabled={!!props.disabled || formState.isSubmitting}
    />
  );
}
