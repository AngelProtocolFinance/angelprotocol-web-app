import { useFieldArray, useFormContext } from "react-hook-form";
import { Beneficiary } from "../types";
import { useModalContext } from "contexts/ModalContext";
import Icon from "components/Icon";
import TableSection, { Cells } from "components/TableSection";
import { isEmpty } from "helpers";
import MemberForm from "./AddForm";

const name = "beneficiaries";

export default function Beneficiaries() {
  const { showModal } = useModalContext();
  const { fields, append, remove } = useFieldArray({
    name,
  });

  function handleAdd(beneficiary: Beneficiary) {
    append(beneficiary);
  }
  async function handleRemove(index: number) {
    remove(index);
  }

  return (
    <div className="mb-8 grid content-start border border-prim p-8 rounded">
      <h3 className="text-xl font-bold mb-8">
        Beneficiary Whitelist at Maturity
      </h3>
      <button
        type="button"
        onClick={() => showModal(MemberForm, { onAdd: handleAdd })}
        className="btn-outline-filled justify-self-end text-sm py-3 px-8 gap-3 mb-5"
      >
        <Icon type="Plus" />
        <span>Add beneficiary</span>
      </button>
      {isEmpty(fields) ? (
        <p>Multisig wallet is the beneficiary</p>
      ) : (
        <table className="table-fixed rounded outline outline-1 outline-prim">
          <TableSection
            type="thead"
            rowClass="border-b border-prim bg-orange-l6 dark:bg-blue-d7 rounded"
          >
            <Cells type="th" cellClass="text-xs uppercase text-left py-3 px-4">
              <p className="w-80">Member</p>
              <>Share</>
              <></>
            </Cells>
          </TableSection>
          <TableSection
            type="tbody"
            rowClass="border-b border-prim last:border-none"
          >
            {fields.map((field, idx) => (
              <Row key={field.id} idx={idx} onRemove={handleRemove} />
            ))}
          </TableSection>
        </table>
      )}
    </div>
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
      <>{addr}</>
      <>{share}</>

      <div className="w-full h-full relative">
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
      </div>
    </Cells>
  );
}
