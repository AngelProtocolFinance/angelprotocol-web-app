import allCountries from "assets/countries/all.json";
import { useGetter, useSetter } from "store/accessors";
import { setCountries } from "slices/components/marketFilter";
import { FilterOption, FlatFilter } from "./common";

const options: FilterOption<string>[] = allCountries.map((c) => ({
  displayText: c.name,
  value: c.name,
  key: c.name,
}));

export default function Countries() {
  const countries = useGetter(
    (state) => state.component.marketFilter.countries
  );
  const dispatch = useSetter();

  return (
    <FlatFilter
      label="Countries"
      classes="grid grid-rows-3 grid-cols-3 gap-y-2"
      options={options}
      selectedValues={countries}
      onChange={(value) => dispatch(setCountries(value))}
    />
  );
}
