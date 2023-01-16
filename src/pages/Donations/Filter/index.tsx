import { Popover } from "@headlessui/react";
import { yupResolver } from "@hookform/resolvers/yup";
import { useRef } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { FilterFormValues } from "./types";
import { DonationsQueryParams } from "types/aws";
import Icon from "components/Icon";
import { cleanObject } from "helpers/cleanObject";
import Form from "./Form";
import { schema } from "./schema";

const Filter = ({
  setFilterValues,
}: {
  setFilterValues: React.Dispatch<React.SetStateAction<DonationsQueryParams>>;
}) => {
  const buttonRef = useRef<HTMLButtonElement | null>(null);

  const methods = useForm<FilterFormValues>({
    resolver: yupResolver(schema),
    reValidateMode: "onChange",
    defaultValues: {
      startDate: "",
      endDate: "",
      network: "",
      currency: "",
    },
  });

  const { handleSubmit, reset } = methods;

  async function submit(data: FilterFormValues) {
    setFilterValues((prev) => ({
      id: prev.id,
      ...cleanObject({
        afterDate: data.startDate ? new Date(data.startDate).toISOString() : "",
        beforeDate: data.endDate ? new Date(data.endDate).toISOString() : "",
        chainName: data.network,
        denomination: data.currency,
      }),
    }));
    buttonRef.current?.click();
  }

  const handleReset = () => {
    reset();
    submit({} as FilterFormValues);
  };

  return (
    <Popover className="sm:block sm:relative sm:py-3 sm:px-4 mt-6 sm:mt-0 sm:max-h-[3.1rem] border border-gray-l2 dark:border-bluegray rounded-md border-collapse dark:bg-blue-d6">
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
        <Form submit={handleSubmit(submit)} handleReset={handleReset} />
      </FormProvider>
    </Popover>
  );
};
export default Filter;
