import { Path } from "react-hook-form";
import { AccountRequirements } from "../types";
import { FormValues } from "./types";
import { Selector } from "components/Selector";
import { Field, Label } from "components/form";
import { isEmpty } from "helpers";
import { undot } from "./dot";

type Props = { accountRequirements: AccountRequirements };

export default function Form({ accountRequirements }: Props) {
  return (
    <>
      {accountRequirements.fields.map((field) => {
        const requirements = field.group[0];

        const requirementsKey = undot(requirements.key);

        const name: Path<FormValues> = `requirements.${accountRequirements.type}.${requirementsKey}`;

        if (
          requirements.type === "text" ||
          !requirements.valuesAllowed ||
          isEmpty(requirements.valuesAllowed)
        ) {
          return (
            <Field<FormValues>
              key={name}
              name={name}
              label={requirements.name}
              placeholder={requirements.example}
              classes="field-admin"
            />
          );
        }

        return (
          <div key={name} className="flex flex-col">
            <Label required={requirements.required}>{requirements.name}</Label>
            <Selector<FormValues, string>
              name={name}
              options={requirements.valuesAllowed.map((valuesAllowed) => ({
                label: valuesAllowed.name,
                value: valuesAllowed.key,
              }))}
            />
          </div>
        );
      })}
    </>
  );
}
