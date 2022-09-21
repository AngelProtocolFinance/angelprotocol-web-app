import { Tab } from "@headlessui/react";
import { useFormContext } from "react-hook-form";
import { FormValues } from "./types";
import { AccountType } from "types/contracts";
import { humanize } from "helpers";
import Fields from "./Fields";
import useInvest from "./useInvest";

const tabs: AccountType[] = ["liquid", "locked"];
export default function Form() {
  const {
    handleSubmit,
    formState: { isDirty, isValid },
  } = useFormContext<FormValues>();

  const { invest } = useInvest();

  return (
    <form
      className="grid content-start text-zinc-50/80 p-3 bg-zinc-50/5 shadow-inner"
      onSubmit={handleSubmit(invest)}
    >
      <Tab.Group>
        <h3 className="text-lg uppercase font-bold mb-4">
          Investable balance (USDC)
        </h3>
        <Tab.List className="grid justify-self-start">
          {tabs.map((tab) => (
            <TabWithBalance key={tab} type={tab} />
          ))}
        </Tab.List>
        <Tab.Panels>
          {tabs.map((tab) => (
            <Fields key={tab} classes="mt-4" type={tab} />
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

type TabProps = { type: AccountType };
function TabWithBalance({ type }: TabProps) {
  const { watch, getValues } = useFormContext<FormValues>();
  const investments = watch("investments");
  const total = investments
    .filter((inv) => inv.type === type)
    .reduce((t, inv) => t + inv.amount, 0);

  const balance = getValues(`balance.${type}`);
  const remaining = balance - total;

  return (
    <Tab
      className={({ selected }) =>
        `uppercase flex items-baseline gap-2 p-2 rounded-md ${
          selected
            ? "border-2 border-angel-blue/80"
            : "border-2 border-transparent"
        }`
      }
    >
      <div className="text-sm font-bold font-heading w-24 text-left">
        {type}{" "}
      </div>
      <span className="font-mono">
        {humanize(remaining < 0 ? 0 : remaining)}
      </span>
    </Tab>
  );
}
