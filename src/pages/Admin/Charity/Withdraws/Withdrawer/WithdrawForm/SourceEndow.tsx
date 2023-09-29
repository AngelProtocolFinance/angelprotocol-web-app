import { Listbox } from "@headlessui/react";
import { useFormContext } from "react-hook-form";
import { FV } from "./types";
import { DrawerIcon } from "components/Icon";
import { useAdminContext } from "../../../../Context";
import { WithdrawEndowSource, useWithdrawContext } from "../Context";

export default function SourceEndow({ classes = "" }) {
  const { id } = useAdminContext();
  const {
    getValues,
    formState: { isSubmitting },
    setValue,
  } = useFormContext<FV>();
  const thisEndow = { id, name: "This endowment" };
  const closedEndowSources = getValues("closedEndowSources");
  const {
    withdrawEndowSource = { id, name: "This endowment" },
    setWithdrawEndowSource,
  } = useWithdrawContext();

  if (closedEndowSources.length === 0) return null;

  return (
    <Listbox
      value={withdrawEndowSource}
      by="name"
      onChange={(val: WithdrawEndowSource) => {
        /**
         * user might select beneficiary type to wallet and then select
         * closed endowment as source. Also update beneficiaryType accordingly
         */
        setValue("beneficiaryType", "endowment");
        setValue("beneficiaryEndowment", {
          id: val.id.toString(),
          name: val.name,
        });
        setWithdrawEndowSource(val);
      }}
      as="div"
      className={`relative ${classes}`}
    >
      <Listbox.Label className="block font-bold font-work mb-2">
        Withdraw from:
      </Listbox.Label>
      <Listbox.Button
        aria-disabled={isSubmitting}
        as="button"
        className="flex items-center field-input min-h-[3rem] justify-between peer-focus:border-gray-d1 peer-focus:dark:border-blue-l2 cursor-pointer"
      >
        {({ open }) => (
          <>
            <span>{withdrawEndowSource?.name ?? "Select source of fund"}</span>
            <DrawerIcon
              isOpen={open}
              size={25}
              className="justify-self-end dark:text-gray shrink-0"
            />
          </>
        )}
      </Listbox.Button>
      <Listbox.Options className="rounded-sm text-sm border border-prim absolute top-full mt-2 z-10 bg-gray-l6 dark:bg-blue-d6 w-full max-h-[10rem] overflow-y-auto scroller">
        {[thisEndow].concat(closedEndowSources).map((o) => (
          //if options are available, include this endow so user could go back
          <Listbox.Option
            key={o.id}
            value={o}
            className={({ active, selected }) => optionStyle(selected, active)}
          >
            <div>{o.name}</div>
            {thisEndow.id !== o.id && (
              <span className="text-xs text-gray-d1 dark:text-gray">
                CLOSED: withdrawing as beneficiary
              </span>
            )}
          </Listbox.Option>
        ))}
      </Listbox.Options>
    </Listbox>
  );
}

const optionStyle = (selected: boolean, active: boolean) =>
  `px-4 py-2 cursor-pointer ${
    selected
      ? "bg-blue-l2  dark:bg-blue-d1"
      : active
      ? "cursor-pointer bg-blue-l3 dark:bg-blue-d2"
      : ""
  }`;
