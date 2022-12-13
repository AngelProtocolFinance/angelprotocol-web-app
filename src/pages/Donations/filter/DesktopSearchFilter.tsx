import { Popover } from "@headlessui/react";
import { useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { Chain, Filters } from "types/aws";
import { useChainQuery, useChainsQuery } from "services/apes";
import { useErrorContext } from "contexts/ErrorContext";
import Icon from "components/Icon";
import { FormValues } from "./schema";

const DesktopSearchFilter = ({
  updateFilterValues,
  address,
}: {
  updateFilterValues: Function;
  address: string | undefined;
}) => {
  const [startDate, setStartDate] = useState<string>("");
  const [isNetworkSelected, setIsNetworkSelected] = useState<Boolean>(false);
  const { handleError } = useErrorContext();
  const {
    handleSubmit,
    register,
    reset,
    control,
    formState: { isSubmitting, errors },
  } = useForm<FormValues>({
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

  async function submit(data: FormValues) {
    !data.startDate || !data.endDate
      ? delete filters.transactionDate
      : (filters.transactionDate = `${data.startDate.toString()} ${data.endDate.toString()}`);
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
    <Popover className="hidden sm:block relative py-3 px-4 border border-gray-l2 dark:border-bluegray rounded-sm">
      <Popover.Button
        ref={buttonRef}
        className={
          "w-full flex justify-between items-center outline-0 text-gray-d2 dark:text-white"
        }
      >
        <div className="uppercase font-semibold">Filter</div>
        <Icon type="ArrowDown" size={20}></Icon>
      </Popover.Button>

      <Popover.Panel className="absolute w-full right-[.05rem] z-10 border border-gray-l2 dark:border-bluegray rounded-sm mt-4">
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
                    onChange={() => setIsNetworkSelected(true)}
                    className={
                      "inline-flex w-full justify-between items-center border border-gray-l2 dark:border-bluegray rounded-sm p-3"
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
                {/* <div className="flex flex-col text-gray-d2 gap-2">
                    <label className="dark:text-white">Currency</label>
                    <select
                      {...register("currency")}
                      className={
                        "inline-flex w-full justify-between items-center border border-gray-l2 dark:border-bluegray rounded-sm p-3"
                      }
                    >
                      <option value="">Select a currency...</option>
                      {currencies?.map((currency: Chain) => (
                        <option
                          key={currency.chain_id}
                          value={currency.native_currency}
                        >
                          {currency.native_currency}
                        </option>
                      ))}
                    </select>
                  </div> */}
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
            </div>
          </div>
        </form>
      </Popover.Panel>
    </Popover>
  );
};
export default DesktopSearchFilter;
