import { FormValues } from "./types";
import { useCountriesQuery } from "services/countries";
import QueryLoader from "components/QueryLoader";
import { Selector, selectorButtonStyle } from "components/Selector";
import { Label } from "components/form";

export default function ActivityCountries() {
  const queryState = useCountriesQuery({});
  return (
    <>
      <Label className="-mb-4" required>
        Active countries
      </Label>
      <QueryLoader
        queryState={queryState}
        messages={{
          loading: "Loading currencies..",
          error: "Failed to get currency options",
        }}
        classes={{
          container:
            selectorButtonStyle + " bg-white dark:bg-blue-d6 px-4 py-3",
        }}
      >
        {(countries) => (
          <Selector<FormValues, "active_in_countries", string, true>
            name="active_in_countries"
            multiple
            classes={{ button: "dark:bg-blue-d6" }}
            options={countries.map((c) => ({
              label: c.name,
              value: c.name,
            }))}
          />
        )}
      </QueryLoader>
    </>
  );
}
