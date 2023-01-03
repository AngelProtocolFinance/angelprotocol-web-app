import { Popover } from "@headlessui/react";
import { yupResolver } from "@hookform/resolvers/yup";
import { useRef } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { FilterFormValues, Filters } from "../types";
import Icon from "components/Icon";
import Form from "./Form";
import { schema } from "./schema";

const Filter = ({ updateFilterValues }: { updateFilterValues: Function }) => {
  const buttonRef = useRef<HTMLButtonElement | null>(null);

  const methods = useForm<FilterFormValues>({
    resolver: yupResolver(schema),
    reValidateMode: "onChange",
  });

  const { handleSubmit } = methods;

  const filters: Filters = {
    transactionDate: "",
    chainName: "",
    denomination: "",
  };
  async function submit(data: FilterFormValues) {
    data.startDate && data.endDate
      ? (filters.transactionDate = `${data.startDate.toISOString()} ${data.endDate.toISOString()}`)
      : (filters.transactionDate = "");
    data.network !== "default" && (filters.chainName = data.network);
    data.currency !== "default" && (filters.denomination = data.currency);

    if (Object.keys(filters).length !== 0) {
      updateFilterValues(filters);
    }
    buttonRef.current?.click();
  }

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

      <FormProvider {...methods}>
        <Form submit={handleSubmit(submit)} />
      </FormProvider>
    </Popover>
  );
};
export default Filter;
