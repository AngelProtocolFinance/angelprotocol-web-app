import { useFieldArray, useFormContext } from "react-hook-form";
import { OnVaultSelect } from "../../../Vaults/types";
import { FormValues as FV } from "../types";
import { maskAddress } from "helpers";
import useVaultSelection from "../../../Vaults/useVaultSelection";
import VaultField from "./Field";
import Field from "./Field";

type Props = { classes?: string };
export default function Fields({ classes = "" }: Props) {
  const { watch, getValues } = useFormContext<FV>();
  const { fields, remove, append } = useFieldArray<FV>({
    name: "investments", // unique name for your Field Array
  });
  const onSelect: OnVaultSelect = (addr) => {
    append({ amount: 0, vault: addr });
  };

  const showVaults = useVaultSelection({
    onSelect,
    preSelected: fields.map((f) => f.vault),
    type: "liquid",
  });

  return (
    <div>
      {fields.map((field, i) => (
        <Field
          key={field.id}
          name={maskAddress(field.vault)}
          remove={remove}
          idx={i}
        />
      ))}
    </div>
  );
}
