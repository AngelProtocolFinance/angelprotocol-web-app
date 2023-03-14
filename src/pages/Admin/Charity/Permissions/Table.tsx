import { Controller, useFormContext } from "react-hook-form";
import { useAdminResources } from "pages/Admin/Guard";
import { useGetWallet } from "contexts/WalletContext";
import TableSection, { Cells } from "components/TableSection";
import { FormField, FormValues } from "./schema";

export default function Table({ className = "", disabled = false }) {
  const { endow_type } = useAdminResources<"charity">();
  const { wallet } = useGetWallet();

  const { control, getValues } = useFormContext<FormValues>();

  const { initialValues, ...formValues } = getValues();

  const isNormal = endow_type === "normal";

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
          {isNormal ? <>Governance</> : null}
          <>Delegate</>
          <>Delegate address</>
          {isNormal ? <>Actions</> : null}
        </Cells>
      </TableSection>
      <TableSection
        type="tbody"
        rowClass="dark:bg-blue-d6 divide-x divide-prim"
        selectedClass="bg-orange-l5 dark:bg-blue-d4"
      >
        {(
          Object.keys(formValues) as (keyof Omit<FormValues, "initialValues">)[]
        ).map((formField) => (
          <Controller
            key={`table-row-${formField}`}
            control={control}
            name={formField}
            render={({ field: { value, onChange } }) => {
              const isDisabled =
                !value.modifiable ||
                disabled ||
                (value.delegate && value.delegate_address !== wallet?.address);
              return (
                <Cells
                  type="td"
                  cellClass="py-3 px-4 border-t border-prim min-w-[116px] max-w-xs truncate first:rounded-bl last:rounded-br"
                >
                  <>{value.name}</>

                  <input
                    type="checkbox"
                    className="checkbox-orange"
                    checked={value.owner_controlled}
                    disabled={isDisabled}
                    onChange={() =>
                      onChange({
                        ...value,
                        owner_controlled: !value.owner_controlled,
                      })
                    }
                  />
                  {isNormal ? (
                    <input
                      type="checkbox"
                      className="checkbox-orange"
                      checked={value.gov_controlled}
                      disabled={isDisabled}
                      onChange={() =>
                        onChange({
                          ...value,
                          gov_controlled: !value.gov_controlled,
                        })
                      }
                    />
                  ) : null}
                  <input
                    type="checkbox"
                    className="checkbox-orange"
                    checked={value.delegate}
                    disabled={isDisabled}
                    onChange={() =>
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
                    disabled={!value.delegate || isDisabled}
                  />

                  {isNormal ? (
                    <button
                      type="button"
                      className="btn-red py-1 px-2 rounded font-semibold text-xs uppercase text-white tracking-wider"
                      disabled={isDisabled}
                      onClick={() => {
                        const newValue: FormField = {
                          ...value,
                          modifiable: false,
                        };
                        onChange(newValue);
                      }}
                    >
                      {value.modifiable ? "Lock forever" : "Locked forever"}
                    </button>
                  ) : null}
                </Cells>
              );
            }}
          />
        ))}
      </TableSection>
    </table>
  );
}
