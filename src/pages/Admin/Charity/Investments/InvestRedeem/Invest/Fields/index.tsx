import { Tab } from "@headlessui/react";
import { useFieldArray, useFormContext } from "react-hook-form";
import { OnVaultSelect } from "../../../Vaults/types";
import { FormValues as FV } from "../types";
import { AccountType } from "types/contracts";
import Icon from "components/Icon";
import { maskAddress } from "helpers";
import useVaultSelection from "../../../Vaults/useVaultSelection";
import VaultField from "./Field";
import Field from "./Field";

type Props = { classes?: string; type: AccountType };
export default function Fields({ classes = "", type }: Props) {
  const { watch, getValues } = useFormContext<FV>();
  const { fields, remove, append } = useFieldArray<FV>({
    name: "investments", // unique name for your Field Array
  });
  const onSelect: OnVaultSelect = (addr) => {
    append({ amount: 0, vault: addr, type });
  };

  const showVaults = useVaultSelection({
    onSelect,
    preSelected: fields.map((f) => f.vault),
    type: type,
  });

  const investments = watch("investments");
  const balance = getValues(`balance.${type}`);
  const total = investments
    .filter((f) => f.type === type)
    .reduce((total, inv) => total + inv.amount, 0);

  return (
    <Tab.Panel>
      <p></p>
      {fields.map((field, i) =>
        //preseve field idx
        field.type === type ? (
          <Field
            key={field.id}
            name={maskAddress(field.vault)}
            remove={remove}
            idx={i}
          />
        ) : null
      )}
      <button
        disabled={total > balance}
        onClick={showVaults}
        type="button"
        className={`uppercase text-angel-blue justify-self-start mt-2 text-sm ${
          total <= 0 ? "justify-self-center  " : ""
        }`}
      >
        <Icon type="Plus" className="relative bottom-0.5 inline mr-1" />
        add vault
      </button>
    </Tab.Panel>
  );
}
