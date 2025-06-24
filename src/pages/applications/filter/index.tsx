import {
  type QueryParams,
  queryParams,
} from "@better-giving/registration/approval";
import { Popover, PopoverButton } from "@headlessui/react";
import { useSearchParams } from "@remix-run/react";
import { DrawerIcon } from "components/icon";
import { FilterIcon } from "lucide-react";
import { parse } from "valibot";
import { Form } from "./form";
import type { FV } from "./schema";

type Props = {
  classes?: string;
  isDisabled: boolean;
};

export function Filter({ classes = "", isDisabled }: Props) {
  const [params, setParams] = useSearchParams();
  const parsed = parse(queryParams, Object.fromEntries(params));

  async function onSubmit(fv: FV) {
    const copy = new URLSearchParams(params);
    copy.set("status", fv.status.value);
    copy.set("country", fv.country);
    if (fv.start_date) copy.set("startDate", fv.start_date);
    if (fv.end_date) copy.set("endDate", fv.end_date);
    setParams(copy);
  }

  return (
    <Popover className={`${classes} flex relative items-center`}>
      <PopoverButton
        disabled={isDisabled}
        className="w-full lg:w-[22.3rem] flex justify-center items-center p-3 rounded-sm bg-blue text-white lg:dark:text-gray lg:text-gray lg:bg-white lg:dark:bg-blue-d6 lg:justify-between disabled:bg-gray lg:disabled:bg-gray-l3 lg:dark:disabled:bg-gray-d3 lg:border lg:border-gray-l3"
      >
        {({ open }) => (
          <>
            <FilterIcon className="lg:hidden mr-1" size={16} />
            <div className="uppercase font-semibold text-[0.9375rem] ">
              Filter
            </div>
            <DrawerIcon isOpen={open} className="hidden lg:inline" size={21} />
          </>
        )}
      </PopoverButton>

      <Form
        params={parsed}
        onSubmit={onSubmit}
        onReset={() => setParams({ status: "02" } satisfies QueryParams)}
        classes="max-lg:fixed max-lg:inset-x-0 max-lg:top-0 lg:mt-1 absolute top-full z-20"
      />
    </Popover>
  );
}
