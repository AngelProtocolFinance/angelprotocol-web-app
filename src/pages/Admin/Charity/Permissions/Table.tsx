import { useFormContext } from "react-hook-form";
import { useAdminResources } from "pages/Admin/Guard";
import TableSection, { Cells } from "components/TableSection";
import { CheckField } from "components/form";
import { getTypedKeys } from "helpers";
import LockButton from "./LockButton";
import { FormField, FormValues, UpdateableFormValues } from "./schema";
import useTableData from "./useTableData";

const formValues: UpdateableFormValues = {
  accountFees: {} as FormField,
  beneficiaries_allowlist: {} as FormField,
  contributors_allowlist: {} as FormField,
  donationSplitParams: {} as FormField,
  profile: {} as FormField,
};
const FORM_KEYS = getTypedKeys(formValues);

export default function Table({ className = "" }) {
  const { endow_type } = useAdminResources<"charity">();

  const {
    register,
    formState: { errors },
  } = useFormContext<FormValues>();

  const getData = useTableData();

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
          <>Actions</>
        </Cells>
      </TableSection>
      <TableSection
        type="tbody"
        rowClass="dark:bg-blue-d6 divide-x divide-prim"
        selectedClass="bg-orange-l5 dark:bg-blue-d4"
      >
        {FORM_KEYS.map((fieldName) => {
          const {
            name,
            checkboxDisabled,
            delegateAddressDisabled,
            lockBtnDisabled,
          } = getData(fieldName);

          return (
            <Cells
              key={`table-row-${fieldName}`}
              type="td"
              cellClass="py-3 px-4 border-t border-prim xl:min-w-[116px] max-w-xs first:max-xl:max-w-[200px] truncate first:rounded-bl last:rounded-br"
            >
              <>{name}</>

              <CheckField<FormValues>
                name={`${fieldName}.ownerControlled`}
                classes={{
                  label: "uppercase text-xs font-bold",
                  input: "checkbox-orange",
                }}
                disabled={checkboxDisabled}
              />
              {isNormal ? (
                <CheckField<FormValues>
                  name={`${fieldName}.govControlled`}
                  classes={{
                    label: "uppercase text-xs font-bold",
                    input: "checkbox-orange",
                  }}
                  disabled={checkboxDisabled}
                />
              ) : null}
              <CheckField<FormValues>
                name={`${fieldName}.delegated`}
                classes={{
                  label: "uppercase text-xs font-bold",
                  input: "checkbox-orange",
                }}
                disabled={checkboxDisabled}
              />

              <input
                type="text"
                className={`field-input min-w-[9rem] w-full truncate py-1.5 ${
                  !errors[fieldName]
                    ? ""
                    : "border-red dark:border-red-l2 focus:border-red focus:dark:border-red-l2"
                }`}
                placeholder="Wallet address..."
                {...register(`${fieldName}.delegate_address`)}
                disabled={delegateAddressDisabled}
                autoComplete="off"
                spellCheck={false}
              />

              <LockButton disabled={lockBtnDisabled} name={fieldName} />
            </Cells>
          );
        })}
      </TableSection>
    </table>
  );
}
