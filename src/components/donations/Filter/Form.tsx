import { Popover } from "@headlessui/react";
import { yupResolver } from "@hookform/resolvers/yup";
import { FC, useState } from "react";
import { useForm } from "react-hook-form";
import { FilterFormValues, Filters } from "../types";
import { useChainsQuery, useCurrenciesQuery } from "services/apes";
import Icon from "components/Icon";
import CurrencyDropdown from "./CurrencyDropdown";
import DateRange from "./DateRange";
import NetworkDropdown from "./NetworkDropdown";
import { schema } from "./schema";

type FormProps = {
  updateFilterValues: Function;
  buttonRef: any;
};

const Form: FC<FormProps> = ({ updateFilterValues, buttonRef }) => {
  const [selectedNetwork, setSelectedNetwork] = useState<string>("");
  const [selectedCurrency, setSelectedCurrency] = useState<string>("");
  const {
    handleSubmit,
    register,
    reset,
    formState: { errors, isDirty },
  } = useForm<FilterFormValues>({
    resolver: yupResolver(schema),
    reValidateMode: "onChange",
    defaultValues: {
      startDate: new Date(),
      endDate: new Date(),
    },
  });
  const { data: networks } = useChainsQuery("");
  const { data: currencies } = useCurrenciesQuery();

  const filters: Filters = {
    transactionDate: "",
    chainName: "",
    denomination: "",
  };

  async function submit(data: FilterFormValues) {
    data.startDate && data.endDate
      ? (filters.transactionDate = `${data.startDate.toISOString()} ${data.endDate.toISOString()}`)
      : (filters.transactionDate = "");
    filters.chainName = selectedNetwork;
    filters.denomination = selectedCurrency;

    if (Object.keys(filters).length !== 0) {
      updateFilterValues(filters);
    }
    buttonRef.current?.click();
  }

  const formReset = () => {
    reset();
    setSelectedNetwork("");
    setSelectedCurrency("");
    updateFilterValues(filters);
  };

  return (
    <form onSubmit={handleSubmit(submit)} method="get">
      <div className="flex flex-col">
        <div className="flex sm:hidden justify-between border-b-[1px] bg-orange-l6 dark:bg-blue-d7 border-gray-l2 dark:border-bluegray">
          <h2 className="text-xl text-orange font-bold p-5 uppercase">
            Filters
          </h2>
          <Popover.Button className="p-5">
            <Icon type="Close" size={24} className="text-gray-d2" />
          </Popover.Button>
        </div>
        <div className="flex sm:hidden justify-end items-center gap-4 bg-orange-l6 dark:bg-blue-d7 border-b-[1px] border-gray-l2 dark:border-bluegray py-3 px-5">
          <button
            type="button"
            className="text-orange underline"
            onClick={formReset}
          >
            Reset filters
          </button>
          <button
            type="submit"
            className="flex justify-center items-center text-white bg-orange p-3 rounded-md disabled:bg-gray"
            disabled={
              isDirty || selectedNetwork || selectedCurrency ? false : true
            }
          >
            Apply filter
          </button>
        </div>
        <div>
          <div className="flex flex-col w-full p-6 gap-6 bg-white dark:bg-blue-d5">
            <DateRange register={register} errors={errors} />
            <NetworkDropdown
              selectedNetwork={selectedNetwork}
              setSelectedNetwork={setSelectedNetwork}
              networks={networks}
            />

            <CurrencyDropdown
              selectedCurrency={selectedCurrency}
              setSelectedCurrency={setSelectedCurrency}
              currencies={currencies}
            />
          </div>
          <div className="hidden sm:flex justify-end items-center gap-4 bg-orange-l6 dark:bg-blue-d7 border-b-[1px] border-gray-l2 dark:border-bluegray py-3 px-5">
            <button
              type="button"
              className="text-orange underline"
              onClick={formReset}
            >
              Reset filters
            </button>
            <button
              type="submit"
              className="flex justify-center items-center text-white bg-orange p-3 rounded-md disabled:bg-gray"
              disabled={
                isDirty || selectedNetwork || selectedCurrency ? false : true
              }
            >
              Apply filter
            </button>
          </div>
        </div>
      </div>
    </form>
  );
};
export default Form;
