import { Popover } from "@headlessui/react";
import { useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { Chain, FilterFormValues, Filters } from "types/aws";
import { useChainQuery, useChainsQuery } from "services/apes";
import Icon from "components/Icon";

const MobileSearchFilter = ({
  updateFilterValues,
  address,
}: {
  updateFilterValues: Function;
  address: string | undefined;
}) => {
  const [startDate, setStartDate] = useState<string>("");
  const [isNetworkSelected, setIsNetworkSelected] = useState<Boolean>(false);
  const { handleSubmit, register, reset } = useForm<FilterFormValues>({
    reValidateMode: "onSubmit",
  });
  const buttonRef = useRef<any>();
  const { data: networks } = useChainsQuery("");
  // const { data: currencies } = useChainQuery({ address: address });

  const filters: Filters = {
    transactionDate: "",
    chainName: "",
    denomination: "",
  };

  async function submit(data: FilterFormValues) {
    if (startDate) {
      !data.startDate || !data.endDate
        ? delete filters.transactionDate
        : (filters.transactionDate = `${data.startDate.toString()} ${data.endDate.toString()}`);
    }
    !data.network
      ? delete filters.chainName
      : (filters.chainName = data.network);
    !data.currency
      ? delete filters.denomination
      : (filters.denomination = data.currency);

    if (Object.keys(filters).length !== 0) {
      updateFilterValues(filters);
    }
    buttonRef.current?.click();
  }

  return (
    <div>
      {/* {Mobile} */}
      <Popover className="sm:hidden">
        <form onSubmit={handleSubmit(submit)} method="get">
          <Popover.Button
            ref={buttonRef}
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
                    setStartDate("");
                    setIsNetworkSelected(false);
                    updateFilterValues(filters);
                    updateFilterValues(filters);
                  }}
                >
                  Reset filters
                </button>
                <button
                  type="submit"
                  className="flex justify-center items-center text-white bg-orange p-3 rounded-md disabled:bg-gray"
                  disabled={startDate || isNetworkSelected ? false : true}
                >
                  Apply filter
                </button>
              </div>
              <div className="overflow-y-scroll">
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
                        max={new Date().toISOString().split("T")[0]}
                        onChange={(e) => setStartDate(e.target.value)}
                      />
                      <input
                        {...register("endDate")}
                        type="date"
                        className="w-full py-3 pl-3 border border-gray-l2 dark:border-bluegray rounded-sm"
                        placeholder="To"
                        min={startDate}
                        max={new Date().toISOString().split("T")[0]}
                        disabled={startDate ? false : true}
                        defaultValue={startDate && startDate}
                      />
                    </div>
                  </div>
                  <div className="flex flex-col text-gray-d2 gap-2">
                    <label className="dark:text-white">Network</label>
                    <select
                      {...register("network")}
                      className={
                        "inline-flex w-full justify-between items-center border border-gray-l2 dark:border-bluegray rounded-sm p-3"
                      }
                      onChange={() => setIsNetworkSelected(true)}
                    >
                      <option value="">Select a network...</option>
                      {networks?.map((network) => (
                        <option
                          key={network.chain_id}
                          value={network.chain_name}
                        >
                          {network.chain_name}
                        </option>
                      ))}
                    </select>
                  </div>
                  {/* <div className="flex flex-col text-gray-d2 gap-2">
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
                      {currencies?.map((currency: Chain) => (
                        <Listbox.Option
                          key={currency.chain_id}
                          value={currency.native_currency}
                        >
                          {currency.native_currency}
                        </Listbox.Option>
                      ))}
                    </Listbox.Options>
                  </Listbox>
                </div> */}
                </div>
              </div>
            </div>
          </Popover.Panel>
        </form>
      </Popover>
    </div>
  );
};
export default MobileSearchFilter;
