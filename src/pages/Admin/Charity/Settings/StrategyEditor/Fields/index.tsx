import { useFieldArray, useFormContext } from "react-hook-form";
import { FormValues as FV } from "../types";
import { AccountType } from "types/contracts";
import Icon from "components/Icon";
import { maskAddress } from "helpers";
import Field from "./Field";

type Props = { classes?: string; type: AccountType };
export default function Fields({ classes = "", type }: Props) {
  const { watch } = useFormContext<FV>();
  const { fields, remove } = useFieldArray<FV>({
    name: "allocations", // unique name for your Field Array
  });

  const allocations = watch("allocations");

  function renderFields() {
    const total = allocations.reduce(
      (total, curr) => total + curr.percentage,
      0
    );
    const _fields = fields.map((field, i) => (
      <Field
        type={type}
        key={field.id}
        name={maskAddress(field.vault)}
        idx={i}
        remove={remove}
      />
    ));
    const idxAfterLastField = fields.length;
    if (total < 100) {
      _fields.push(
        <Field
          type={type}
          key={"investable__assets"}
          name="Investable assets"
          idx={idxAfterLastField}
          staticVal={100 - total}
          remove={remove}
        />
      );
    }
    return _fields;
  }

  return (
    <div className="grid gap-4">
      {renderFields()}

      <button
        onClick={() => {
          alert("todo: add vault");
        }}
        type="button"
        className="uppercase text-blue justify-self-start mt-2 text-sm"
      >
        <Icon type="Plus" className="relative bottom-0.5 inline mr-1" />
        add vault
      </button>
    </div>
  );
}
