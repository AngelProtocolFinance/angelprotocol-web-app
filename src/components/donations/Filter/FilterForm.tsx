import { Popover } from "@headlessui/react";
import { ErrorMessage } from "@hookform/error-message";
import { yupResolver } from "@hookform/resolvers/yup";
import { useRef, useState } from "react";
import { useForm, useFormState } from "react-hook-form";
import { FilterFormValues, Filters } from "../types";
import { useChainsQuery, useCurrenciesQuery } from "services/apes";
import Icon from "components/Icon";
import { schema } from "./schema";

const FilterForm = ({
  updateFilterValues,
}: {
  updateFilterValues: Function;
}) => {
  const [selectedStartDate, setSelectedStartDate] = useState<
    Date | null | string
  >(null);
  const [selectedNetwork, setSelectedNetwork] = useState<string>("");
  const [selectedCurrency, setSelectedCurrency] = useState<string>("");
  const {
    handleSubmit,
    register,
    reset,
    formState: { errors, isValid },
  } = useForm<FilterFormValues>({
    resolver: yupResolver(schema(selectedStartDate)),
    reValidateMode: "onSubmit",
    defaultValues: {
      startDate: new Date(),
      endDate: new Date(),
    },
  });
  const buttonRef = useRef<any>();
  const { data: networks } = useChainsQuery("");
  const { data: currencies } = useCurrenciesQuery();

  const filters: Filters = {
    transactionDate: "",
    chainName: "",
    denomination: "",
  };

  async function submit(data: FilterFormValues) {
    if (selectedStartDate) {
      data.startDate && data.endDate
        ? (filters.transactionDate = `${data.startDate.toString()} ${data.endDate.toString()}`)
        : (filters.transactionDate = "");
    }
    filters.chainName = selectedNetwork;
    filters.denomination = selectedCurrency;

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

      <Popover.Panel className="fixed min-w-[100vw] min-h-[100vh] top-0 left-0 sm:top-auto sm:left-auto sm:absolute sm:min-w-full sm:min-h-fit sm:right-[.05rem] z-50 border border-gray-l2 dark:border-bluegray sm:rounded-sm sm:mt-4">
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
                onClick={() => {
                  reset({
                    startDate: new Date(),
                    endDate: new Date(),
                    network: "",
                    currency: "",
                  });
                  setSelectedStartDate("");
                  setSelectedNetwork("");
                  setSelectedCurrency("");
                  updateFilterValues(filters);
                }}
              >
                Reset filters
              </button>
              <button
                type="submit"
                className="flex justify-center items-center text-white bg-orange p-3 rounded-md disabled:bg-gray"
                disabled={
                  selectedStartDate || selectedNetwork || selectedCurrency
                    ? false
                    : true
                }
              >
                Apply filter
              </button>
            </div>
            <div>
              <div className="flex flex-col w-full p-6 gap-6 bg-white dark:bg-blue-d5">
                <div className="flex flex-col text-gray-d2 gap-2">
                  <label className="dark:text-white">Date</label>
                  <div className="flex gap-4">
                    <input
                      {...register("startDate")}
                      type="date"
                      className="w-full py-3 pl-3 border border-gray-l2 dark:border-bluegray rounded-sm dark:text-gray dark:bg-blue-d6 dark:placeholder:text-gray"
                      placeholder="From"
                      onChange={(e) => setSelectedStartDate(e.target.value)}
                    />
                    <input
                      {...register("endDate")}
                      type="date"
                      className="w-full py-3 pl-3 border border-gray-l2 dark:border-bluegray rounded-sm dark:text-gray dark:bg-blue-d6 dark:placeholder:text-gray"
                      placeholder="To"
                      disabled={!isValid}
                    />
                  </div>
                  <ErrorMessage
                    errors={errors}
                    as="span"
                    name="startDate"
                    className="w-full text-xs text-red-l4 dark:text-red-l2"
                  />
                  <ErrorMessage
                    errors={errors}
                    as="p"
                    name="endDate"
                    className="w-full text-xs text-red-l4 dark:text-red-l2"
                  />
                </div>
                <div className="flex flex-col text-gray-d2 gap-2">
                  <label className="dark:text-white">Network</label>
                  <select
                    value={selectedNetwork}
                    onChange={(e) => setSelectedNetwork(e.target.value)}
                    className={
                      "inline-flex w-full justify-between items-center border border-gray-l2 dark:border-bluegray rounded-sm p-3 dark:text-gray dark:bg-blue-d6 dark:placeholder:text-gray"
                    }
                  >
                    <option value="">Select a network...</option>
                    {networks?.map((network) => (
                      <option key={network.chain_id} value={network.chain_name}>
                        {network.chain_name}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="flex flex-col text-gray-d2 gap-2">
                  <label className="dark:text-white">Currency</label>
                  <select
                    value={selectedCurrency}
                    onChange={(e) => setSelectedCurrency(e.target.value)}
                    className={
                      "inline-flex w-full justify-between items-center border border-gray-l2 dark:border-bluegray rounded-sm p-3 dark:text-gray dark:bg-blue-d6 dark:placeholder:text-gray"
                    }
                  >
                    <option value="">Select a currency...</option>
                    {currencies?.map((currency) => (
                      <option key={currency.token_id} value={currency.symbol}>
                        {currency.symbol}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
              <div className="hidden sm:flex justify-end items-center gap-4 bg-orange-l6 dark:bg-blue-d7 border-b-[1px] border-gray-l2 dark:border-bluegray py-3 px-5">
                <button
                  type="button"
                  className="text-orange underline"
                  onClick={() => {
                    reset({
                      startDate: new Date(),
                      endDate: new Date(),
                    });
                    setSelectedStartDate("");
                    setSelectedNetwork("");
                    setSelectedCurrency("");
                    updateFilterValues(filters);
                  }}
                >
                  Reset filters
                </button>
                <button
                  type="submit"
                  className="flex justify-center items-center text-white bg-orange p-3 rounded-md disabled:bg-gray"
                  disabled={
                    selectedStartDate || selectedNetwork || selectedCurrency
                      ? false
                      : true
                  }
                >
                  Apply filter
                </button>
              </div>
            </div>
          </div>
        </form>
      </Popover.Panel>
    </Popover>
  );
};
export default FilterForm;
