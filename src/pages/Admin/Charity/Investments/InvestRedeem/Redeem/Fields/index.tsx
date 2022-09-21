import { Tab } from "@headlessui/react";
import { useFieldArray } from "react-hook-form";
import { FormValues as FV } from "../types";
import { AccountType } from "types/contracts";
import { maskAddress } from "helpers";
import Field from "./Field";

type Props = { classes?: string; type: AccountType };
export default function Fields({ classes = "", type }: Props) {
  const { fields } = useFieldArray<FV>({
    name: type,
  });

  if (fields.length <= 0) {
    return <p>You don't have any {type} investments</p>;
  }

  return (
    <Tab.Panel className={`grid grid-cols-2 gap-x-4 ${classes}`}>
      {fields.map((field, i) => (
        <Field
          key={field.id}
          name={maskAddress(field.vault)}
          idx={i}
          type={type}
        />
      ))}
    </Tab.Panel>
  );
}
