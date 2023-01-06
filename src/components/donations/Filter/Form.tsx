import { Popover } from "@headlessui/react";
import { FC, FormEventHandler } from "react";
import { FilterFormValues as FV } from "../types";
import Icon from "components/Icon";
import Controls from "./Controls";
import CurrencyDropdown from "./CurrencyDropdown";
import DateInput from "./DateInput";
import NetworkDropdown from "./NetworkDropdown";

const Form: FC<{ submit: FormEventHandler<HTMLFormElement> }> = ({
  submit,
}) => {
  return (
    <Popover.Panel className="fixed min-w-[100vw] min-h-[100vh] top-0 left-0 right-0 bottom-0 sm:top-auto sm:left-auto sm:bottom-auto sm:absolute sm:min-w-full sm:min-h-fit sm:right-[.05rem] z-50 border border-gray-l2 dark:border-bluegray sm:mt-4 sm:rounded-md sm:border-collapse sm:overflow-hidden bg-white">
      <form className="flex flex-col" onSubmit={submit} method="get">
        <div className="flex sm:hidden justify-between border-b-[1px] bg-orange-l6 dark:bg-blue-d7 border-gray-l2 dark:border-bluegray">
          <h2 className="text-xl text-orange font-bold p-5 uppercase">
            Filters
          </h2>
          <Popover.Button className="p-5">
            <Icon type="Close" size={24} className="text-gray-d2" />
          </Popover.Button>
        </div>
        <div className="grid grid-cols-1">
          <div className="order-2 sm:order-1 flex flex-col w-full p-6 gap-6 bg-white dark:bg-blue-d5">
            <div className="grid gap-2 grid-cols-2">
              <label className="col-span-full">Date</label>
              <DateInput<FV> name="startDate" placeholder="From" />
              <DateInput<FV> name="endDate" placeholder="To" />
            </div>
            <NetworkDropdown />
            <CurrencyDropdown />
          </div>
          <Controls classes="order-1 sm:order-2" />
        </div>
      </form>
    </Popover.Panel>
  );
};
export default Form;
