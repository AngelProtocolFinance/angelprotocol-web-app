import { Controller, useFormContext } from "react-hook-form";
import TableSection, { Cells } from "components/TableSection";
import { FormValues } from "./schema";

export default function Table({ className = "" }) {
  const {
    control,
    formState: { defaultValues },
  } = useFormContext<FormValues>();

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
          cellClass="py-3 px-4 text-xs uppercase font-semibold text-left first:rounded-tl last:rounded-tr"
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
        {(Object.keys(defaultValues || {}) as (keyof FormValues)[]).map(
          (formField) => (
            <Controller
              control={control}
              name={formField}
              render={({ field: { value, onChange } }) => (
                <Cells
                  key={`table-row-${formField}`}
                  type="td"
                  cellClass="py-3 px-4 border-t border-prim min-w-[116px] max-w-xs truncate first:rounded-bl last:rounded-br"
                >
                  <>{value.name}</>

                  <RadioButton
                    checked={value.owner_controlled}
                    onClick={() =>
                      onChange({
                        ...value,
                        owner_controlled: !value.owner_controlled,
                      })
                    }
                  />
                  <RadioButton
                    checked={value.gov_controlled}
                    onClick={() =>
                      onChange({
                        ...value,
                        gov_controlled: !value.gov_controlled,
                      })
                    }
                  />
                  <RadioButton
                    checked={value.delegate}
                    onClick={() =>
                      onChange({
                        ...value,
                        delegate: !value.delegate,
                      })
                    }
                  />

                  <input
                    type="text"
                    className="field-input w-full truncate py-1.5"
                    placeholder="Wallet address..."
                    value={value.delegate_address}
                    onChange={(e) =>
                      onChange({
                        ...value,
                        delegate_address: e.target.value,
                      })
                    }
                    disabled={!value.delegate}
                  />
                </Cells>
              )}
            />
          )
        )}
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
