import { useCountriesQuery } from "@giving/services/countries";
import { FieldValues, Path } from "react-hook-form";
import { OptionType } from "@giving/types/components/selector";
import QueryLoader from "./QueryLoader";
import { Selector, selectorButtonStyle } from "./Selector";

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
  const queryState = useCountriesQuery({});
  return (
    <QueryLoader
      queryState={queryState}
      messages={{
        loading: "Loading countries..",
        error: "Failed to get country options",
      }}
      classes={{
        container: `${selectorButtonStyle} ${classes?.container || ""}`,
      }}
    >
      {(countries) => (
        <Selector<T, K, string, true>
          name={name}
          multiple
          classes={{ button: classes?.button || "" }}
          options={countries.map((c) => ({
            label: c.name,
            value: c.name,
          }))}
        />
      )}
    </QueryLoader>
  );
}
