import { useFieldArray, useFormContext } from "react-hook-form";
import { OnVaultSelect } from "../../Vaults/types";
import { StrategyFormValues as SF } from "../types";
import TableSection, { Cells } from "components/TableSection";
import { maskAddress } from "helpers";
import { UNALLOCATED_COLOR, pieColors } from "../../Pie";
import useVaultSelection from "../../Vaults/useVaultSelection";
import VaultField from "./VaultField";

type Props = { classes?: string };
export default function Fields({ classes = "" }: Props) {
  const { watch } = useFormContext<SF>();
  const { fields, remove, append } = useFieldArray<SF>({
    name: "allocations", // unique name for your Field Array
  });
  const onSelect: OnVaultSelect = (addr) => {
    append({ percentage: 0, vault: addr });
  };

  const showVaults = useVaultSelection({
    onSelect,
    preSelected: fields.map((f) => f.vault),
    type: "liquid",
  });

  const allocations = watch("allocations");
  const total = allocations.reduce((total, curr) => total + curr.percentage, 0);

  function renderFields() {
    const _fields = fields.map((field, i) => (
      <VaultField
        key={field.id}
        name={maskAddress(field.vault)}
        idx={i}
        remove={remove}
        color={pieColors[i].bg}
      />
    ));
    const idxAfterLastField = fields.length;
    if (total < 100) {
      _fields.push(
        <VaultField
          key={"investable__assets"}
          name="Investable assets"
          idx={idxAfterLastField}
          staticVal={100 - total}
          remove={remove}
          color={UNALLOCATED_COLOR.bg}
        />
      );
    }
    return _fields;
  }

  return (
    <>
      <table className={`border border-zinc-50/30 ${classes}`}>
        <TableSection
          type="thead"
          rowClass="border-b border-zinc-50/30 divide-x divide-zinc-50/30"
        >
          <Cells type="th" cellClass="uppercase font-semibold p-2">
            <>Vault</>
            <>%</>
          </Cells>
        </TableSection>
        <TableSection
          type="tbody"
          rowClass="border-b border-zinc-50/30 divide-x divide-zinc-50/30"
        >
          {renderFields()}
        </TableSection>
      </table>
      {total > 100 && (
        <div className="g">
          <p className="text-left text-rose-400 font-bold font-heading uppercase">
            <span className="text-sm pr-2">total</span>
            <span>{total}%</span>
          </p>
          <p className="text-sm text-rose-300 text-left">
            Total allocation should not be greater than 100%
          </p>
        </div>
      )}
      <button onClick={showVaults} type="button">
        add vault
      </button>
    </>
  );
}
