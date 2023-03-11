import { Listbox } from "@headlessui/react";
import { useEffect } from "react";
import { Controller, useFormContext } from "react-hook-form";
import { WithdrawValues } from "./types";
import Icon, { DrawerIcon } from "components/Icon";
import { chainIds } from "constants/chains";

const AVAILABLE_CHAINS: { chainId: string; name: string }[] = [
  { chainId: chainIds.juno, name: "juno" },
  { chainId: chainIds.ethereum, name: "ethereum" },
  { chainId: chainIds.binance, name: "binance" },
];

export default function Network() {
  const { control, watch, trigger } = useFormContext<WithdrawValues>();
  const network = watch("network");

  useEffect(() => {
    (async () => {
      //validate address on network change
      await trigger("beneficiary");
      await trigger("amounts");
    })();
  }, [network, trigger]);

  return (
    <div className="grid gap-3">
      <span className="font-work font-bold">Select network</span>
      <Controller
        control={control}
        name="network"
        render={({ field: { onChange, value, onBlur } }) => (
          <Listbox
            onBlur={onBlur}
            onChange={onChange}
            value={value}
            as="div"
            className="relative"
          >
            <Listbox.Button className="grid grid-cols-[1fr_auto] items-center text-left gap-2 w-full @md:w-52 p-4 border border-prim rounded">
              {({ open }) => (
                <>
                  <span className="uppercase truncate @max-md:text-sm">
                    {AVAILABLE_CHAINS.find((chain) => chain.chainId === value)
                      ?.name || "Unknown chain"}
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
                {AVAILABLE_CHAINS.map((chain) => (
                  <Listbox.Option
                    key={`listbox-opt-${chain.chainId}`}
                    value={chain.chainId}
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
                        {chain.name}
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
      />
    </div>
  );
}
