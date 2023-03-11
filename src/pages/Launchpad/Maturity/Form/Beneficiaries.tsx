import { useMemo } from "react";
import { useFieldArray, useFormContext } from "react-hook-form";
import { FV } from "../types";
import { Beneficiary } from "slices/launchpad/types";
import { useModalContext } from "contexts/ModalContext";
import Icon from "components/Icon";
import TableSection, { Cells } from "components/TableSection";
import { isEmpty } from "helpers";
import { Group, GroupTitle } from "../../common/Form";
import Info from "../../common/Info";
import MemberForm from "./AddForm";

const name: keyof FV = "beneficiaries";

export default function Beneficiaries({ classes = "" }) {
  const { showModal } = useModalContext();
  const { watch } = useFormContext<FV>();
  const { fields, append, remove } = useFieldArray({
    name,
  });

  function handleAdd(beneficiary: Beneficiary) {
    append(beneficiary);
  }
  async function handleRemove(index: number) {
    remove(index);
  }

  const beneficiaries = watch("beneficiaries");
  const totalShare = useMemo(
    () => beneficiaries.reduce((acc, cur) => acc + +cur.share, 0),
    [beneficiaries]
  );

  return (
    <Group className={classes}>
      <GroupTitle className="mb-8">
        Beneficiary Whitelist at Maturity
      </GroupTitle>
      <button
        type="button"
        onClick={() =>
          showModal(MemberForm, {
            onAdd: handleAdd,
            share: totalShare,
            added: beneficiaries.map((b) => b.addr),
          })
        }
        className="btn-outline-filled sm:justify-self-end text-sm py-3 px-8 gap-3 mb-5"
      >
        <Icon type="Plus" />
        <span>Add beneficiary</span>
      </button>
      {isEmpty(fields) ? (
        <Info>Multisig wallet is the beneficiary</Info>
      ) : (
        <table className="rounded outline outline-1 outline-prim">
          <TableSection
            type="thead"
            rowClass="border-b border-prim bg-orange-l6 dark:bg-blue-d7 rounded"
          >
            <Cells type="th" cellClass="text-xs uppercase text-left py-3 px-4">
              <>Member</>
              <>Allocation</>
              <></>
            </Cells>
          </TableSection>
          <TableSection
            type="tbody"
            rowClass="border-b border-prim last:border-none even:bg-orange-l6 even:dark:bg-blue-d7"
          >
            {fields.map((field, idx) => (
              <Row key={field.id} idx={idx} onRemove={handleRemove} />
            ))}
          </TableSection>
        </table>
      )}
      {totalShare < 100 && totalShare !== 0 && (
        <Info classes="mt-8">
          {100 - totalShare}% share goes to Multisig wallet
        </Info>
      )}
    </Group>
  );
}

type Props = {
  idx: number;
  onRemove(idx: number): void;
};

function Row({ idx, onRemove }: Props) {
  const { getValues } = useFormContext();
  const { addr, share } = getValues(`${name}.${idx}`);
  return (
    <Cells type="td" cellClass="py-3 px-4 text-sm">
      <div className="w-[4.8rem] sm:w-28 md:w-full truncate">{addr}</div>
      <td className="font-work">{share}%</td>

      <td className="w-12 h-full relative">
        <button
          className="text-center absolute-center"
          type="button"
          onClick={() => onRemove(idx)}
        >
          <Icon
            type="CloseCircle"
            size={22}
            className="text-gray-d1 dark:text-gray"
          />
        </button>
      </td>
    </Cells>
  );
}
