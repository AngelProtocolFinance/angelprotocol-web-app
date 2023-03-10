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
              render={({
                field: { value, onChange },
                formState: { isSubmitting },
              }) => (
                <Cells
                  key={`table-row-${formField}`}
                  type="td"
                  cellClass="py-3 px-4 border-t border-prim min-w-[116px] max-w-xs truncate first:rounded-bl last:rounded-br"
                >
                  <>{value.name}</>

                  <Checkbox
                    checked={value.owner_controlled}
                    disabled={isSubmitting}
                    onClick={() =>
                      onChange({
                        ...value,
                        owner_controlled: !value.owner_controlled,
                      })
                    }
                  />
                  <Checkbox
                    checked={value.gov_controlled}
                    disabled={isSubmitting}
                    onClick={() =>
                      onChange({
                        ...value,
                        gov_controlled: !value.gov_controlled,
                      })
                    }
                  />
                  <Checkbox
                    checked={value.delegate}
                    disabled={isSubmitting}
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
                    disabled={!value.delegate || isSubmitting}
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

function Checkbox({
  checked,
  disabled,
  onClick,
}: {
  checked: boolean;
  disabled?: boolean;
  onClick(): void;
}) {
  return (
    <input
      type="checkbox"
      className="checkbox-orange"
      checked={checked}
      onChange={onClick}
      disabled={disabled}
    />
  );
}
