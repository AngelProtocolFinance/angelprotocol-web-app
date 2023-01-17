import { Popover } from "@headlessui/react";
import { FC, FormEventHandler } from "react";
import { FormValues as FV } from "./types";
import CurrencyDropdown from "./CurrencyDropdown";
import DateInput from "./DateInput";
import NetworkDropdown from "./NetworkDropdown";

type Props = {
  submit: FormEventHandler<HTMLFormElement>;
  onReset: FormEventHandler<HTMLFormElement>;
  classes?: string;
};

const Form: FC<Props> = ({ onReset, submit, classes = "" }) => {
  return (
    <Popover.Panel
      as="form"
      onSubmit={submit}
      onReset={onReset}
      className={`${classes} absolute top-full mt-1 grid gap-4  w-full z-10 rounded border border-gray-l2 dark:border-bluegray bg-white dark:bg-blue-d5`}
    >
      {/* <h2 className="text-xl text-orange font-bold p-5 uppercase">Filters</h2> */}
      {/* <Popover.Button className="absolute top-5 right-5">
        <Icon type="Close" size={24} className="text-gray-d2" />
      </Popover.Button> */}

      <div className="grid gap-x-[1.125rem] grid-cols-2 px-6 pt-6">
        <label className="col-span-full text-sm mb-2">Date</label>
        <DateInput<FV> name="startDate" />
        <DateInput<FV> name="endDate" />
      </div>

      <NetworkDropdown classes="px-6" />
      <CurrencyDropdown classes="px-6" />

      <div className="p-6 mt-2 bg-orange-l6 dark:bg-blue-d7 border-t border-gray-l2 dark:border-bluegray">
        <button type="reset" className="text-orange underline text-sm">
          Reset filters
        </button>
      </div>
    </Popover.Panel>
  );
};
export default Form;
