import { Disclosure } from "@headlessui/react";
import { useFormContext } from "react-hook-form";
import { useAdminResources } from "pages/Admin/Guard";
import { useGetWallet } from "contexts/WalletContext";
import { DrawerIcon } from "components/Icon";
import { CheckField, Label } from "components/form";
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
  const { endow_type, propMeta } = useAdminResources<"charity">();
  const { wallet } = useGetWallet();
  const {
    watch,
    register,
    formState: { errors },
  } = useFormContext<FormValues>();

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
            const modifiable = watch(`${fieldName}.modifiable`);
            const initOwnerControlled = watch(
              `initialValues.${fieldName}.owner_controlled`
            );
            const userAuthorized: boolean =
              (initDelegate &&
                !!initDelegateAddress &&
                initDelegateAddress !== wallet?.address) ||
              (initOwnerControlled && propMeta.isAuthorized);

            const isDisabled = disabled || !initModifiable || !userAuthorized;

            const inputDisabled = isDisabled || !modifiable;

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
                      disabled={inputDisabled}
                    >
                      Admin wallet
                    </CheckField>
                    {endow_type === "normal" && (
                      <CheckField<FormValues>
                        name={`${fieldName}.gov_controlled`}
                        classes={{
                          label: "uppercase text-xs font-bold",
                          input: "checkbox-orange",
                        }}
                        disabled={inputDisabled}
                      >
                        Governance
                      </CheckField>
                    )}
                    <CheckField<FormValues>
                      name={`${fieldName}.delegate`}
                      classes={{
                        label: "uppercase text-xs font-bold",
                        input: "checkbox-orange",
                      }}
                      disabled={inputDisabled}
                    >
                      Delegate
                    </CheckField>
                  </div>
                  <div className="grid gap-2 py-3 px-4">
                    <Label
                      className="uppercase text-xs font-bold"
                      htmlFor={`del-addr-input-${fieldName}`}
                    >
                      Delegate address
                    </Label>

                    <input
                      id={`del-addr-input-${fieldName}`}
                      disabled={!delegate || inputDisabled}
                      className={`field-input truncate h-8 ${
                        !errors[fieldName]
                          ? ""
                          : "border-red dark:border-red-l2 focus:border-red focus:dark:border-red-l2"
                      }`}
                      autoComplete="off"
                      spellCheck={false}
                      {...register(`${fieldName}.delegate_address`)}
                    />
                  </div>
                  <div className="flex justify-between items-center p-4">
                    <span className="font-bold uppercase">Actions</span>
                    <LockButton disabled={isDisabled} name={fieldName} />
                  </div>
                </Disclosure.Panel>
              </>
            );
          }}
        </Disclosure>
      ))}
    </div>
  );
}
