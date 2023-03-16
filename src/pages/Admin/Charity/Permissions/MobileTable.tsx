import { Disclosure } from "@headlessui/react";
import { useFormContext } from "react-hook-form";
import { useAdminResources } from "pages/Admin/Guard";
import { useGetWallet } from "contexts/WalletContext";
import { DrawerIcon } from "components/Icon";
import { CheckField, Field } from "components/form";
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

export default function MobileTable({ className = "", disabled = false }) {
  const { endow_type } = useAdminResources<"charity">();
  const { wallet } = useGetWallet();
  const { watch } = useFormContext<FormValues>();

  return (
    <div className={`${className} border border-prim rounded-t`}>
      <div className="grid items-center grid-cols-[auto_1fr] h-12 uppercase text-xs font-bold bg-orange-l6 dark:bg-blue-d7 border-b border-prim divide-x divide-prim rounded-t">
        <div className="w-12" />
        <div className="py-3 px-4">Action</div>
      </div>

      {FORM_KEYS.map((fieldName) => (
        <Disclosure
          key={`mob-table-row-${fieldName}`}
          as="div"
          className="text-sm odd:bg-orange-l6 dark:even:bg-blue-d6 dark:odd:bg-blue-d7 w-full border-b last:border-0 border-prim"
        >
          {({ open }) => {
            const delegate = watch(`${fieldName}.delegate`);
            const name = watch(`${fieldName}.name`);
            const initDelegate = watch(`initialValues.${fieldName}.delegate`);
            const initDelegateAddress = watch(
              `initialValues.${fieldName}.delegate_address`
            );
            const initModifiable = watch(
              `initialValues.${fieldName}.modifiable`
            );
            const isDisabled =
              disabled ||
              !initModifiable ||
              (initDelegate &&
                !!initDelegateAddress &&
                initDelegateAddress !== wallet?.address);

            return (
              <>
                <Disclosure.Button
                  className={`${
                    open ? "bg-orange-l5 dark:bg-blue-d4" : ""
                  } w-full grid grid-cols-[auto_1fr_auto] divide-x divide-prim`}
                >
                  <DrawerIcon
                    size={24}
                    className={`${
                      open ? "text-orange" : ""
                    } w-12 place-self-center`}
                    isOpen={open}
                  />
                  <p className="text-sm p-4 text-left h-full truncate">
                    {name}
                  </p>
                </Disclosure.Button>
                <Disclosure.Panel className="w-full font-work divide-y divide-prim border-t border-prim">
                  <div className="grid gap-4 py-3 px-4">
                    <CheckField<FormValues>
                      name={`${fieldName}.owner_controlled`}
                      classes={{
                        label: "uppercase text-xs font-bold",
                        input: "checkbox-orange",
                      }}
                      disabled={isDisabled}
                    >
                      Admin wallet
                    </CheckField>
                    <CheckField<FormValues>
                      name={`${fieldName}.gov_controlled`}
                      classes={{
                        label: "uppercase text-xs font-bold",
                        input: "checkbox-orange",
                      }}
                      disabled={isDisabled}
                    >
                      Governance
                    </CheckField>
                    <CheckField<FormValues>
                      name={`${fieldName}.delegate`}
                      classes={{
                        label: "uppercase text-xs font-bold",
                        input: "checkbox-orange",
                      }}
                      disabled={isDisabled}
                    >
                      Delegate
                    </CheckField>
                  </div>
                  <Field<FormValues>
                    name={`${fieldName}.delegate_address`}
                    label="Delegate address"
                    placeholder="juno1..."
                    classes={{
                      container: "py-3 px-4",
                      label: "uppercase text-xs font-bold",
                      input: "field-input truncate h-8",
                    }}
                    disabled={!delegate || isDisabled}
                  />
                  {endow_type === "normal" ? (
                    /** Color #54595F is hardcoded because this is the only place where it's necessary */
                    <div className="flex justify-between items-center p-4">
                      <span className="font-bold uppercase">Actions</span>
                      <LockButton disabled={isDisabled} name={fieldName} />
                    </div>
                  ) : null}
                </Disclosure.Panel>
              </>
            );
          }}
        </Disclosure>
      ))}
    </div>
  );
}
