import { Listbox } from "@headlessui/react";
import { useEffect } from "react";
import { useFormContext } from "react-hook-form";
import { WithdrawValues } from "./types";
import { useChainsQuery } from "services/apes";
import Icon, { DrawerIcon } from "components/Icon";
import QueryLoader from "components/QueryLoader";

export default function Network() {
  const queryState = useChainsQuery({});
  const { register, watch, trigger } = useFormContext<WithdrawValues>();
  const network = watch("network");

  useEffect(() => {
    (async () => {
      //validate address on network change
      await trigger("beneficiary");
    })();
  }, [network, trigger]);

  return (
    <div className="grid gap-3">
      <span className="font-work font-bold">Select network</span>
      <QueryLoader
        queryState={queryState}
        messages={{
          loading: "Loading available networks...",
          empty: "No available networks",
          error: "Error loading networks",
        }}
      >
        {(chains) => (
          <Listbox {...register("network")} as="div" className="relative">
            <Listbox.Button className="grid grid-cols-[1fr_auto] items-center text-left gap-2 w-full @md:w-52 p-4 border border-prim rounded">
              {({ open, value }) => (
                <>
                  <span className="truncate @max-md:text-sm">
                    {
                      chains.find((chain) => chain.chain_id === value)
                        ?.chain_name
                    }
                  </span>
                  <DrawerIcon
                    isOpen={open}
                    className="text-2xl text-gray-d1 dark:text-white"
                    aria-hidden="true"
                  />
                </>
              )}
            </Listbox.Button>

            <Listbox.Options className="absolute mt-1 z-10 flex flex-col gap-1 w-full p-1 border border-prim rounded bg-white dark:bg-blue-d6 shadow-lg">
              <>
                {chains.map((chain) => (
                  <Listbox.Option
                    key={`listbox-opt-${chain.chain_id}`}
                    value={chain.chain_id}
                    className={({ active, selected }) =>
                      `grid grid-cols-[auto_1fr_auto] items-center gap-2 p-4 pl-2 rounded @max-md:text-sm uppercase cursor-pointer ${
                        selected
                          ? "bg-orange-l4 dark:bg-blue-d4"
                          : active
                          ? "bg-orange-l5 dark:bg-blue-d3"
                          : ""
                      }`
                    }
                  >
                    {({ selected }) => (
                      <>
                        {chain.chain_name}
                        {selected && (
                          <Icon
                            type="Check"
                            className="text-2xl text-gray-d1 dark:text-white"
                          />
                        )}
                      </>
                    )}
                  </Listbox.Option>
                ))}
              </>
            </Listbox.Options>
          </Listbox>
        )}
      </QueryLoader>
    </div>
  );
}
