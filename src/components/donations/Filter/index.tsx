import { Popover } from "@headlessui/react";
import { useRef } from "react";
import Icon from "components/Icon";
import Form from "./Form";

const Filter = ({ updateFilterValues }: { updateFilterValues: Function }) => {
  const buttonRef = useRef<any>();

  return (
    <Popover className="sm:block sm:relative sm:py-3 sm:px-4 mt-6 sm:mt-0 sm:max-h-[3.1rem] border border-gray-l2 dark:border-bluegray rounded-md sm:rounded-sm dark:bg-blue-d6">
      <Popover.Button
        ref={buttonRef}
        className={
          "w-full flex justify-center sm:justify-between items-center text-white bg-orange p-3 sm:p-0 sm:bg-white dark:bg-blue-d6 outline-0 sm:text-gray-d2 dark:text-white"
        }
      >
        <Icon className="sm:hidden" type="Filter" size={20} />
        <div className="uppercase font-semibold">Filter</div>
        <Icon className="hidden sm:inline" type="ArrowDown" size={20} />
      </Popover.Button>

      <Popover.Panel className="fixed min-w-[100vw] min-h-[100vh] top-0 left-0 sm:top-auto sm:left-auto sm:absolute sm:min-w-full sm:min-h-fit sm:right-[.05rem] z-50 border border-gray-l2 dark:border-bluegray sm:rounded-sm sm:mt-4">
        <Form updateFilterValues={updateFilterValues} buttonRef={buttonRef} />
      </Popover.Panel>
    </Popover>
  );
};
export default Filter;
