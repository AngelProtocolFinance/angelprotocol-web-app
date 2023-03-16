import { useFormContext } from "react-hook-form";
import { useAdminResources } from "pages/Admin/Guard";
import { useGetWallet } from "contexts/WalletContext";
import TableSection, { Cells } from "components/TableSection";
import { getTypedKeys } from "helpers";
import LockButton from "./LockButton";
import { FormField, FormValues, UpdateableFormValues } from "./schema";

const formValues: UpdateableFormValues = {
  accountFees: {} as FormField,
  beneficiaries_allowlist: {} as FormField,
  contributors_allowlist: {} as FormField,
  donationSplitParams: {} as FormField,
  profile: {} as FormField,
};
const FORM_KEYS = getTypedKeys(formValues);

export default function Table({ className = "", disabled = false }) {
  const { endow_type } = useAdminResources<"charity">();
  const { wallet } = useGetWallet();

  const { register, watch } = useFormContext<FormValues>();

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
        {FORM_KEYS.map((fieldName) => {
          const delegate = watch(`${fieldName}.delegate`);
          const name = watch(`${fieldName}.name`);
          const initDelegate = watch(`initialValues.${fieldName}.delegate`);
          const initDelegateAddress = watch(
            `initialValues.${fieldName}.delegate_address`
          );
          const initModifiable = watch(`initialValues.${fieldName}.modifiable`);
          const isDisabled =
            !initModifiable ||
            disabled ||
            (initDelegate &&
              !!initDelegateAddress &&
              initDelegateAddress !== wallet?.address);

          return (
            <Cells
              key={`table-row-${fieldName}`}
              type="td"
              cellClass="py-3 px-4 border-t border-prim min-w-[116px] max-w-xs truncate first:rounded-bl last:rounded-br"
            >
              <>{name}</>

              <input
                type="checkbox"
                className="checkbox-orange"
                {...register(`${fieldName}.owner_controlled`)}
                disabled={isDisabled}
              />
              {isNormal ? (
                <input
                  type="checkbox"
                  className="checkbox-orange"
                  {...register(`${fieldName}.gov_controlled`)}
                  disabled={isDisabled}
                />
              ) : null}
              <input
                type="checkbox"
                className="checkbox-orange"
                {...register(`${fieldName}.delegate`)}
                disabled={isDisabled}
              />

              <input
                type="text"
                className="field-input w-full truncate py-1.5"
                placeholder="Wallet address..."
                {...register(`${fieldName}.delegate_address`)}
                disabled={!delegate || isDisabled}
              />

              {isNormal ? (
                <LockButton disabled={isDisabled} name={fieldName} />
              ) : null}
            </Cells>
          );
        })}
      </TableSection>
    </table>
  );
}
