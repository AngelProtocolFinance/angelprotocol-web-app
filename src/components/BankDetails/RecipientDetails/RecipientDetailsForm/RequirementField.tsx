import { Path } from "react-hook-form";
import { FormValues } from "../types";
import { Group } from "types/aws";
import countries from "assets/countries/all.json";
import CountrySelector from "components/CountrySelector";
import { Selector } from "components/Selector";
import { Field, Label } from "components/form";
import { isEmpty } from "helpers";
import { isCountry, undot } from "../helpers";

type Props = {
  data: Group;
  disabled?: boolean; // need this only for CountrySelector
};

export default function RequirementField({ data, disabled }: Props) {
  const requirementsKey = undot(data.key);

  const name: Path<FormValues> = `requirements.${requirementsKey}`;

  // Optional Wise field names contain " (optional)" at the end
  const label = data.name.replace(new RegExp("\\s*\\(optional\\)$"), "");

  if (data.type === "date") {
    return (
      <Field<FormValues, "date">
        name={name}
        type="date"
        label={label}
        required={data.required}
        classes={{
          input: "date-input uppercase",
          container: "field-admin",
        }}
        disabled={disabled}
      />
    );
  }

  if (
    data.type === "text" ||
    // if by any chance there are fields that are of type `"text"`, but DO have `valuesAllowed` defined,
    // they should be treated as selectors
    !data.valuesAllowed ||
    isEmpty(data.valuesAllowed)
  ) {
    return (
      <Field<FormValues>
        name={name}
        label={label}
        placeholder={data.example}
        required={data.required}
        classes="field-admin"
        disabled={disabled}
      />
    );
  }

  if (isCountry(data)) {
    return (
      <div className="field">
        <Label required={data.required}>{label}</Label>
        <CountrySelector<FormValues, any>
          fieldName={name}
          countries={countries.filter((country) =>
            data.valuesAllowed!.find((x) => x.key === country.code)
          )}
          placeholder={data.example}
          classes={{
            container: "px-4",
            input: "text-sm py-4",
            error: "field-error",
          }}
          disabled={disabled}
        />
      </div>
    );
  }

  return (
    <div className="field">
      <Label required={data.required}>{label}</Label>
      <Selector<FormValues, any, string>
        name={name}
        options={data.valuesAllowed.map((valuesAllowed) => ({
          label: valuesAllowed.name,
          value: valuesAllowed.key,
        }))}
        disabled={disabled}
      />
    </div>
  );
}
