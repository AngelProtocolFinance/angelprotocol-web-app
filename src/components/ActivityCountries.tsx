import { FieldValues, Path } from "react-hook-form";
import countries from "assets/countries/all.json";
import { OptionType, Selector } from "components/Selector";

type Props<T extends FieldValues, K extends Path<T>> = {
  name: T[K] extends OptionType<string>[] ? K : never;
  classes?: {
    container?: string;
    button?: string;
  };
};

export default function ActivityCountries<
  T extends FieldValues,
  K extends Path<T>
>({ name, classes }: Props<T, K>) {
  return (
    <Selector<T, K, string, true>
      name={name}
      multiple
      classes={{ button: classes?.button, container: classes?.container }}
      options={countries.map((c) => ({
        label: c.name,
        value: c.name,
      }))}
    />
  );
}
