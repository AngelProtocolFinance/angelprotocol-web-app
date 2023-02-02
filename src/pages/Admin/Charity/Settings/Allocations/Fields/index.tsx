import { useFieldArray, useFormContext } from "react-hook-form";
import { OnVaultSelect } from "../../../Investments/Vaults/types";
import { StrategyFormValues as SF } from "../types";
import { AccountType } from "types/contracts";
import Icon from "components/Icon";
import TableSection, { Cells } from "components/TableSection";
import { maskAddress } from "helpers";
import useVaultSelection from "../../../Investments/Vaults/useVaultSelection";
import { UNALLOCATED_COLOR, pieColors } from "../../Pie";
import VaultField from "./VaultField";

type Props = { classes?: string; type: AccountType };
export default function Fields({ classes = "", type }: Props) {
  const { watch, getValues } = useFormContext<SF>();
  const { fields, remove, append } = useFieldArray<SF>({
    name: "allocations", // unique name for your Field Array
  });
  const onSelect: OnVaultSelect = (addr) => {
    append({ percentage: 0, vault: addr });
  };

  const showVaults = useVaultSelection({
    onSelect,
    preSelected: fields.map((f) => f.vault),
    type,
  });

  const allocations = watch("allocations");
  const isReadOnly = getValues("isReadOnly");

  function renderFields() {
    const total = allocations.reduce(
      (total, curr) => total + curr.percentage,
      0
    );
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
      <table className={`${classes}`}>
        <TableSection
          type="thead"
          rowClass="border-y border-prim divide-x divide-prim"
        >
          <Cells type="th" cellClass="uppercase font-semibold p-2">
            <>Vault</>
            <>%</>
          </Cells>
        </TableSection>
        <TableSection
          type="tbody"
          rowClass="border-b border-prim divide-x divide-prim"
        >
          {renderFields()}
        </TableSection>
      </table>
      {!isReadOnly && (
        <button
          onClick={showVaults}
          type="button"
          className="uppercase text-blue justify-self-start mt-2 text-sm"
        >
          <Icon type="Plus" className="relative bottom-0.5 inline mr-1" />
          add vault
        </button>
      )}
    </>
  );
}
