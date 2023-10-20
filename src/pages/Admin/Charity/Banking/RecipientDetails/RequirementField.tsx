import { Path, useFormContext } from "react-hook-form";
import { Group } from "../types";
import { FormValues } from "./types";
import { Selector } from "components/Selector";
import { FieldController, Label } from "components/form";
import { isEmpty } from "helpers";
import createRules from "./createRules";

type Props = {
  data: Group;
  index: number;
};

export default function RequirementField({ data, index }: Props) {
  const { control } = useFormContext<FormValues>();

  const name: Path<FormValues> = `requirements.${index}.value`;

  const rules = createRules(data);

  if (data.type === "date") {
    return (
      <FieldController<FormValues, "date">
        controlProps={{ control, name, rules }}
        type="date"
        label={data.name}
        required={data.required}
        classes={{
          input: "date-input uppercase",
          container: "field-admin",
        }}
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
      <FieldController<FormValues>
        controlProps={{ control, name, rules }}
        label={data.name}
        placeholder={data.example}
        required={data.required}
        classes="field-admin"
      />
    );
  }

  return (
    <div className="flex flex-col">
      <Label required={data.required}>{data.name}</Label>
      <Selector<FormValues, string>
        name={name}
        rules={rules}
        options={data.valuesAllowed.map((valuesAllowed) => ({
          label: valuesAllowed.name,
          value: valuesAllowed.key,
        }))}
      />
    </div>
  );
}
