import { Listbox, Popover } from "@headlessui/react";
import { ErrorMessage } from "@hookform/error-message";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Filters } from "types/aws";
import { useErrorContext } from "contexts/ErrorContext";
import Icon from "components/Icon";
import { FormValues } from "./schema";

const SearchFilter = ({
  updateFilterValues,
}: {
  updateFilterValues: Function;
}) => {
  const [selectedNetwork, setSelectedNetwork] = useState(null);
  const [selectedCurrency, setSelectedCurrency] = useState(null);
  const { handleError } = useErrorContext();
  const {
    handleSubmit,
    register,
    reset,
    formState: { isSubmitting, errors },
  } = useForm<FormValues>({
    reValidateMode: "onSubmit",
  });

  useEffect(() => {
    console.log(selectedNetwork);
  }, [selectedNetwork]);

  async function submit(data: FormValues) {
    const filters: Filters = {
      transactionDate: "",
      chainName: "",
      currency: "",
    };

    !data.startDate || !data.endDate
      ? delete filters.transactionDate
      : (filters.transactionDate = `${data.startDate.toUTCString()} ${data.endDate.toUTCString()}`);
    !selectedNetwork
      ? delete filters.chainName
      : (filters.chainName = selectedNetwork);
    !selectedCurrency
      ? delete filters.currency
      : (filters.currency = selectedCurrency);

    console.log(filters);

    if (!isEmpty(filters)) {
      updateFilterValues(filters);
    }
  }

  return (
    <div>
      {/* {Mobile} */}
      <Popover className="sm:hidden">
        <Popover.Button
          className={
            "w-full flex justify-center items-center text-white bg-orange p-3 rounded-md"
          }
        >
          <Icon type="Filter" size={20}></Icon>
          <div className="uppercase font-semibold">Filter</div>
        </Popover.Button>

        <Popover.Panel className="fixed top-0 left-0 bg-white dark:bg-blue-d6 min-w-[100vw] min-h-[100vh] z-50 border border-gray-l2 dark:border-bluegray">
          <div className="flex flex-col">
            <div className="flex justify-between border-b-[1px] bg-orange-l6 dark:bg-blue-d7 border-gray-l2 dark:border-bluegray">
              <h2 className="text-xl text-orange font-bold p-5 uppercase">
                Filters
              </h2>
              <Popover.Button className="p-5">
                <Icon type="Close" size={24} className="text-gray-d2"></Icon>
              </Popover.Button>
            </div>
            <div className="flex justify-end items-center gap-4 bg-orange-l6 dark:bg-blue-d7 border-b-[1px] border-gray-l2 dark:border-bluegray py-3 px-5">
              <a href="#" className="text-orange underline">
                Reset filters
              </a>
              <button className="flex justify-center items-center text-white bg-orange p-3 rounded-md">
                Apply filter
              </button>
            </div>
            <div className="overflow-y-scroll">
              <div className="flex flex-col w-full p-6 gap-6 bg-white dark:bg-blue-d6">
                <div className="flex flex-col text-gray-d2 gap-2">
                  <label className="dark:text-white">Date</label>
                  <div className="flex gap-4">
                    <input
                      type="date"
                      className="w-full py-3 pl-3 border border-gray-l2 dark:border-bluegray rounded-sm"
                      placeholder="From"
                    />
                    <input
                      type="date"
                      className="w-full py-3 pl-3 border border-gray-l2 dark:border-bluegray rounded-sm"
                      placeholder="To"
                    />
                  </div>
                </div>
                <div className="flex flex-col text-gray-d2 gap-2">
                  <label className="dark:text-white">Network</label>
                  <Listbox>
                    <Listbox.Button
                      className={
                        "inline-flex w-full justify-between items-center border border-gray-l2 dark:border-bluegray rounded-sm p-3"
                      }
                    >
                      <div className="text-gray-l2">Select network...</div>
                      <Icon type="ArrowDown" size={30}></Icon>
                    </Listbox.Button>
                    <Listbox.Options>
                      {networks.map((network) => (
                        <Listbox.Option key={network.id} value={network}>
                          {network.name}
                        </Listbox.Option>
                      ))}
                    </Listbox.Options>
                  </Listbox>
                </div>
                <div className="flex flex-col text-gray-d2 gap-2">
                  <label className="dark:text-white">Currency</label>
                  <Listbox>
                    <Listbox.Button
                      className={
                        "inline-flex w-full justify-between items-center border border-gray-l2 dark:border-bluegray rounded-sm p-3"
                      }
                    >
                      <div className="text-gray-l2">Select currency...</div>
                      <Icon type="ArrowDown" size={30}></Icon>
                    </Listbox.Button>
                    <Listbox.Options>
                      {currencies.map((currency) => (
                        <Listbox.Option key={currency.id} value={currency}>
                          {currency.name}
                        </Listbox.Option>
                      ))}
                    </Listbox.Options>
                  </Listbox>
                </div>
              </div>
            </div>
          </div>
        </Popover.Panel>
      </Popover>

      {/* {Desktop} */}
      <Popover className="hidden sm:block relative py-3 px-4 border border-gray-l2 dark:border-bluegray rounded-sm">
        <Popover.Button
          className={
            "w-full flex justify-between items-center outline-0 text-gray-d2 dark:text-white"
          }
        >
          <div className="uppercase font-semibold">Filter</div>
          <Icon type="ArrowDown" size={20}></Icon>
        </Popover.Button>

        <Popover.Panel className="absolute w-full right-[.05rem] z-10 border border-gray-l2 dark:border-bluegray rounded-sm mt-4">
          {({ close }) => (
            <form onSubmit={handleSubmit(submit)} method="get">
              <div className="flex flex-col">
                <div>
                  <div className="flex flex-col w-full p-6 gap-6 bg-white dark:bg-blue-d6">
                    <div className="flex flex-col text-gray-d2 gap-2">
                      <label className="dark:text-white">Date</label>
                      <div className="flex gap-4">
                        <input
                          {...register("startDate")}
                          type="date"
                          className="w-full py-3 pl-3 border border-gray-l2 dark:border-bluegray rounded-sm"
                          placeholder="From"
                          min="2018-12-31"
                          max={new Date().toString()}
                        />
                        <input
                          {...register("endDate")}
                          type="date"
                          className="w-full py-3 pl-3 border border-gray-l2 dark:border-bluegray rounded-sm"
                          placeholder="To"
                          max={new Date().toString()}
                        />
                      </div>
                      <ErrorMessage
                        errors={errors}
                        as="p"
                        name="startDate"
                        className="w-full text-xs text-red-l4 dark:text-red-l2 text-center"
                      />
                      <ErrorMessage
                        errors={errors}
                        as="p"
                        name="endDate"
                        className="w-full text-xs text-red-l4 dark:text-red-l2 text-center"
                      />
                    </div>
                    <div className="flex flex-col text-gray-d2 gap-2">
                      <label className="dark:text-white">Network</label>
                      <Listbox
                        value={selectedNetwork}
                        onChange={setSelectedNetwork}
                        name="network"
                      >
                        <Listbox.Button
                          className={
                            "inline-flex w-full justify-between items-center border border-gray-l2 dark:border-bluegray rounded-sm p-3"
                          }
                        >
                          <div className="text-gray-l2">Select network...</div>
                          <Icon type="ArrowDown" size={30}></Icon>
                        </Listbox.Button>
                        <Listbox.Options>
                          {networks.map((network) => (
                            <Listbox.Option key={network.id} value={network}>
                              {network.name}
                            </Listbox.Option>
                          ))}
                        </Listbox.Options>
                      </Listbox>
                    </div>
                    <div className="flex flex-col text-gray-d2 gap-2">
                      <label className="dark:text-white">Currency</label>
                      <Listbox
                        value={selectedCurrency}
                        onChange={setSelectedCurrency}
                        name="currency"
                      >
                        <Listbox.Button
                          className={
                            "inline-flex w-full justify-between items-center border border-gray-l2 dark:border-bluegray rounded-sm p-3"
                          }
                        >
                          <div className="text-gray-l2">Select currency...</div>
                          <Icon type="ArrowDown" size={30}></Icon>
                        </Listbox.Button>
                        <Listbox.Options>
                          {currencies.map((currency) => (
                            <Listbox.Option key={currency.id} value={currency}>
                              {currency.name}
                            </Listbox.Option>
                          ))}
                        </Listbox.Options>
                      </Listbox>
                    </div>
                  </div>
                  <div className="flex justify-end items-center gap-4 bg-orange-l6 dark:bg-blue-d7 border-b-[1px] border-gray-l2 dark:border-bluegray py-3 px-5">
                    <a href="#" className="text-orange underline">
                      Reset filters
                    </a>
                    <button
                      type="submit"
                      className="flex justify-center items-center text-white bg-orange p-3 rounded-md"
                    >
                      Apply filter
                    </button>
                  </div>
                </div>
              </div>
            </form>
          )}
        </Popover.Panel>
      </Popover>
    </div>
  );
};
export default SearchFilter;

const networks = [
  { id: 1, name: "Juno Testnet" },
  { id: 2, name: "Another Network" },
];

const currencies = [
  { id: 1, name: "USD" },
  { id: 2, name: "EUR" },
];

function isEmpty(obj: Object) {
  return Object.keys(obj).length === 0;
}
