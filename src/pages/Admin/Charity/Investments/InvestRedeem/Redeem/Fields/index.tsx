import { Tab } from "@headlessui/react";
import { useFieldArray } from "react-hook-form";
import { FormValues as FV } from "../types";
import { AccountType } from "types/contracts";
import { maskAddress } from "helpers";
import Field from "./Field";

type Props = { classes?: string; type: AccountType };
export default function Fields({ classes = "", type }: Props) {
  const { fields } = useFieldArray<Pick<FV, "redeems">>({
    name: "redeems",
  });

  const typeFields = fields.filter((f) => f.type === type);

  if (typeFields.length <= 0) {
    return <p>You don't have any {type} investments</p>;
  }

  return (
    <Tab.Panel className={`grid grid-cols-2 gap-x-4 ${classes}`}>
      {fields.map(
        (field, i) =>
          //preseve field idx
          (field.type === type && (
            <Field key={field.id} name={maskAddress(field.vault)} idx={i} />
          )) ||
          null
      )}
    </Tab.Panel>
  );
}
