import { QueryLoader } from "@ap/components";
import { Label } from "@ap/components/form";
import { Selector, selectorButtonStyle } from "@ap/components/selector";
import { useCountriesQuery } from "@ap/services/countries";
import { FormValues } from "./types";

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
          loading: "Loading countries..",
          error: "Failed to get country options",
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
            classes={{ button: "field-input-admin" }}
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
