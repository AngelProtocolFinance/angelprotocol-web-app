import { PopoverButton, PopoverPanel } from "@headlessui/react";
import { DateInput } from "components/form";
import { X } from "lucide-react";
import type { FC, FormEventHandler } from "react";
import type { FormValues as FV } from "./types";

// import CurrencyDropdown from "./CurrencyDropdown";
// import NetworkDropdown from "./NetworkDropdown";

type Props = {
  submit: FormEventHandler<HTMLFormElement>;
  onReset: FormEventHandler<HTMLFormElement>;
  classes?: string;
};

const Form: FC<Props> = ({ onReset, submit, classes = "" }) => {
  return (
    <PopoverPanel
      as="form"
      onSubmit={submit}
      onReset={onReset}
      className={`${classes} grid content-start gap-4 w-full rounded-sm border border-gray-l3 bg-white dark:bg-blue-d5 pb-6 @5xl:pb-0 shadow-lg @-5xl:shadow-xs`}
    >
      <div className="@5xl:hidden relative text-[1.25rem] px-4 py-3 -mb-4 font-bold uppercase">
        <span className="text-blue-d1">Filters</span>
        <PopoverButton className="absolute top-1/2 -translate-y-1/2 right-2">
          <X size={33} />
        </PopoverButton>
      </div>

      <div className="grid gap-x-[1.125rem] grid-cols-2 px-4 @5xl:px-6 @5xl:pt-6">
        <label className="col-span-full text-sm mb-2">Date</label>
        <DateInput<FV> name="startDate" />
        <DateInput<FV> name="endDate" />
      </div>

      {/*<NetworkDropdown classes="px-4 @5xl:px-6" />*/}
      {/*<CurrencyDropdown classes="px-4 @5xl:px-6" />*/}

      <div className="row-start-2 flex gap-x-4 items-center justify-between px-4 py-3 p-6 @5xl:mt-2 bg-blue-l5 dark:bg-blue-d7 border-y @5xl:border-t border-gray-l3">
        <h3 className="uppercase @5xl:hidden">Filter by</h3>
        <button
          type="reset"
          className="text-blue-d1 underline text-sm ml-auto @5xl:ml-0"
        >
          Reset filters
        </button>
        <button
          type="submit"
          className="btn btn btn-blue px-6 py-2 rounded-xs text-xs font-bold uppercase"
        >
          Submit
        </button>
      </div>
    </PopoverPanel>
  );
};

export default Form;
