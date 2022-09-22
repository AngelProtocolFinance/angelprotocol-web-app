import { Tab } from "@headlessui/react";
import { useFormContext } from "react-hook-form";
import { FormValues } from "./types";
import { AccountType } from "types/contracts";
import Fields from "./Fields";
import useInvest from "./useRedeem";

const tabs: AccountType[] = ["liquid", "locked"];
export default function Form() {
  const {
    handleSubmit,
    formState: { isDirty, isValid },
  } = useFormContext<FormValues>();

  const { invest } = useInvest();

  return (
    <form
      className="grid content-start text-zinc-50/80"
      onSubmit={handleSubmit(invest)}
    >
      <Tab.Group>
        <h3 className="uppercase font-bold mb-2">Select account type</h3>
        <Tab.List className="flex justify-self-start gap-2">
          {tabs.map((tab) => (
            <Tab
              key={tab}
              className={({ selected }) =>
                `p-2 rounded-md uppercase font-heading font-bold text-sm border-2 ${
                  selected ? "border-angel-blue" : "border-zinc-50/20"
                }`
              }
            >
              {tab}
            </Tab>
          ))}
        </Tab.List>
        <Tab.Panels>
          {tabs.map((tab) => (
            <Fields key={tab} classes="mt-4 mb-6" type={tab} />
          ))}
        </Tab.Panels>
      </Tab.Group>
      <button
        disabled={!isDirty || !isValid}
        type="submit"
        className="justify-self-center font-heading justify-self-end text-xs font-bold px-4 py-2 bg-sky-500 disabled:bg-zinc-300 hover:bg-sky-400 uppercase rounded-md text-zinc-50"
      >
        Submit order
      </button>
    </form>
  );
}
