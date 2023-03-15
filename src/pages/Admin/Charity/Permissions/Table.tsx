import { useFormContext } from "react-hook-form";
import { useAdminResources } from "pages/Admin/Guard";
import { useGetWallet } from "contexts/WalletContext";
import TableSection, { Cells } from "components/TableSection";
import { getTypedKeys } from "helpers";
import { FormField, FormValues } from "./schema";

const formValues: FormValues["initialValues"] = {
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

  const { getValues, register, setValue, watch } = useFormContext<FormValues>();

  const { initialValues } = getValues();

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
        {FORM_KEYS.map((formField) => {
          const delegate = watch(`${formField}.delegate`);
          const currModifiable = watch(`${formField}.modifiable`);
          const name = watch(`${formField}.name`);
          const isDisabled =
            !initialValues[formField].modifiable ||
            disabled ||
            (initialValues[formField].delegate &&
              !!initialValues[formField].delegate_address &&
              initialValues[formField].delegate_address !== wallet?.address);
          return (
            <Cells
              key={`table-row-${formField}`}
              type="td"
              cellClass="py-3 px-4 border-t border-prim min-w-[116px] max-w-xs truncate first:rounded-bl last:rounded-br"
            >
              <>{name}</>

              <input
                type="checkbox"
                className="checkbox-orange"
                {...register(`${formField}.owner_controlled`)}
                disabled={isDisabled}
              />
              {isNormal ? (
                <input
                  type="checkbox"
                  className="checkbox-orange"
                  {...register(`${formField}.gov_controlled`)}
                  disabled={isDisabled}
                />
              ) : null}
              <input
                type="checkbox"
                className="checkbox-orange"
                {...register(`${formField}.delegate`)}
                disabled={isDisabled}
              />

              <input
                type="text"
                className="field-input w-full truncate py-1.5"
                placeholder="Wallet address..."
                {...register(`${formField}.delegate_address`)}
                disabled={!delegate || isDisabled}
              />

              {isNormal ? (
                /** Color #54595F is hardcoded because this is the only place where it's necessary */
                <button
                  type="button"
                  className={`btn-red ${
                    currModifiable ? "" : "bg-[#54595F]"
                  } py-1 px-2 font-semibold text-xs uppercase tracking-wider`}
                  disabled={isDisabled}
                  onClick={() => {
                    setValue(`${formField}.modifiable`, !currModifiable);
                  }}
                >
                  {currModifiable ? "Lock forever" : "Locked forever"}
                </button>
              ) : null}
            </Cells>
          );
        })}
      </TableSection>
    </table>
  );
}
