import { Disclosure } from "@headlessui/react";
import { useFormContext } from "react-hook-form";
import { useAdminResources } from "pages/Admin/Guard";
import { DrawerIcon } from "components/Icon";
import { CheckField, Field } from "components/form";
import { FormValues } from "./schema";

export default function MobileTable({ className = "", disabled = false }) {
  const { endow_type } = useAdminResources<"charity">();
  const { getValues, register, watch } = useFormContext<FormValues>();

  const { initialValues, ...formValues } = getValues();

  return (
    <div className={`${className} border border-prim rounded-t`}>
      <div className="grid items-center grid-cols-[auto_1fr] h-12 uppercase text-xs font-bold bg-orange-l6 dark:bg-blue-d7 border-b border-prim divide-x divide-prim rounded-t">
        <div className="w-12" />
        <div className="py-3 px-4">Action</div>
      </div>

      {(
        Object.keys(formValues) as (keyof Omit<FormValues, "initialValues">)[]
      ).map((formField) => (
        <Disclosure
          key={`mob-table-row-${formField}`}
          as="div"
          className="text-sm odd:bg-orange-l6 dark:even:bg-blue-d6 dark:odd:bg-blue-d7 w-full border-b last:border-0 border-prim"
        >
          {({ open }) => {
            const modifiable = watch(`${formField}.modifiable`);
            const isDisabled = !modifiable || disabled;
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
                    {watch(`${formField}.name`)}
                  </p>
                </Disclosure.Button>
                <Disclosure.Panel className="w-full font-work divide-y divide-prim border-t border-prim">
                  <div className="grid gap-4 py-3 px-4">
                    <CheckField<FormValues>
                      name={`${formField}.owner_controlled`}
                      classes={{
                        label: "uppercase text-xs font-bold",
                        input: "checkbox-orange",
                      }}
                      disabled={isDisabled}
                    >
                      Admin wallet
                    </CheckField>
                    <CheckField<FormValues>
                      name={`${formField}.gov_controlled`}
                      classes={{
                        label: "uppercase text-xs font-bold",
                        input: "checkbox-orange",
                      }}
                      disabled={isDisabled}
                    >
                      Governance
                    </CheckField>
                    <CheckField<FormValues>
                      name={`${formField}.delegate`}
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
                    name={`${formField}.delegate_address`}
                    label="Delegate address"
                    placeholder="juno1..."
                    classes={{
                      container: "py-3 px-4",
                      label: "uppercase text-xs font-bold",
                      input: "field-input truncate h-8",
                    }}
                    disabled={isDisabled}
                  />
                  {endow_type === "normal" ? (
                    <div className="flex justify-between items-center p-4">
                      <span className="font-bold uppercase">Actions</span>
                      <button
                        type="button"
                        className="btn-red p-2 rounded font-semibold text-xs uppercase text-white tracking-wider"
                        {...register(`${formField}.modifiable`)}
                        disabled={isDisabled}
                      >
                        {modifiable ? "Lock forever" : "Locked forever"}
                      </button>
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
