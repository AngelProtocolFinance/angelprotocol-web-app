import { FieldValues, Path, PathValue } from "react-hook-form";
import countries from "assets/countries/all.json";
import { MultiSelector, OptionType } from "components/Selector";

type Props<T extends FieldValues, K extends Path<T>> = {
  name: PathValue<T, K> extends OptionType<string>[] ? K : never;
  classes?: {
    container?: string;
    button?: string;
  };
};

export default function ActivityCountries<
  T extends FieldValues,
  K extends Path<T>,
>({ name, classes }: Props<T, K>) {
  return (
    <MultiSelector<T, K, string>
      name={name}
      classes={{ button: classes?.button, container: classes?.container }}
      options={countries.map((c) => ({
        label: c.name,
        value: c.name,
      }))}
      searchable
    />
  );
}
