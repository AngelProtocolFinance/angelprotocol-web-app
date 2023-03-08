import { useFieldArray, useFormContext } from "react-hook-form";
import TableSection, { Cells } from "components/TableSection";
import { FormValues } from "./schema";

export default function Table({ className = "" }) {
  const { control } = useFormContext<FormValues>();
  const { fields, update } = useFieldArray({ control, name: "permissions" });

  return (
    <table
      className={`${className} w-full text-sm rounded border border-separate border-spacing-0 border-prim`}
    >
      <TableSection
        type="thead"
        rowClass="bg-orange-l6 dark:bg-blue-d7 divide-x divide-prim"
      >
        <Cells
          type="th"
          cellClass="px-3 py-4 text-xs uppercase font-semibold text-left first:rounded-tl last:rounded-tr"
        >
          <>Action</>
          <>Admin wallet</>
          <>Governance</>
          <>Delegate</>
          <>Delegate address</>
        </Cells>
      </TableSection>
      <TableSection
        type="tbody"
        rowClass="dark:bg-blue-d6 divide-x divide-prim"
        selectedClass="bg-orange-l5 dark:bg-blue-d4"
      >
        {fields.map((permission, index) => (
          <Cells
            key={permission.id}
            type="td"
            cellClass="py-3 px-4 border-t border-prim min-w-[116px] max-w-xs truncate first:rounded-bl last:rounded-br"
          >
            <>{permission.action}</>
            <RadioButton
              checked={permission.permitted_to === "admin_wallet"}
              onClick={() =>
                update(index, { ...permission, permitted_to: "admin_wallet" })
              }
            />
            <RadioButton
              checked={permission.permitted_to === "governance"}
              onClick={() =>
                update(index, { ...permission, permitted_to: "governance" })
              }
            />
            <RadioButton
              checked={permission.permitted_to === "delegate"}
              onClick={() =>
                update(index, { ...permission, permitted_to: "delegate" })
              }
            />
            <>{permission.delegate_address}</>
          </Cells>
        ))}
      </TableSection>
    </table>
  );
}

function RadioButton({
  checked,
  onClick,
}: {
  checked: boolean;
  onClick(): void;
}) {
  return (
    <button
      type="button"
      className="grid place-items-center w-5 h-5 rounded-full border border-prim group"
      onClick={onClick}
    >
      <span
        className={`w-3 h-3 rounded-full transition ease-in-out duration-200 ${
          checked ? "bg-orange" : "group-hover:bg-orange/50"
        }`}
      />
    </button>
  );
}
