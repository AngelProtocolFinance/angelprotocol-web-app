import { Listbox } from "@headlessui/react";
import { chainIds } from "constant/chainIds";
import { useEffect } from "react";
import { useController, useFormContext } from "react-hook-form";
import { FV } from "./types";
import Icon, { DrawerIcon } from "components/Icon";

type Chain = { chainId: string; name: string };

const EVM_CHAINS: Chain[] = [
  { chainId: chainIds.polygon, name: "polygon" },
  { chainId: chainIds.binance, name: "binance" },
  { chainId: chainIds.ethereum, name: "ethereum" },
];

const AVAILABLE_CHAINS: Chain[] = [
  ...EVM_CHAINS,
  { chainId: chainIds.terra, name: "terra" },
  { chainId: chainIds.juno, name: "juno" },
];

export default function Network({ classes = "" }) {
  const { watch, trigger, getValues } = useFormContext<FV>();
  const {
    field: { onChange: onNetworkChange, value: selectedNetwork, onBlur },
  } = useController<Pick<FV, "destinationChainId">>({
    name: "destinationChainId",
  });
  const destinationChainId = watch("destinationChainId");
  const isClosed = getValues("endowmentState.closed");

  useEffect(() => {
    (async () => {
      //validate address on network change
      await trigger("beneficiaryWallet");
      await trigger("amounts");
    })();
  }, [destinationChainId, trigger]);

  return (
    <div className={`${classes} grid gap-3`}>
      <span className="font-work font-bold">Select network</span>

      <Listbox
        onBlur={onBlur}
        onChange={onNetworkChange}
        value={selectedNetwork}
        as="div"
        className="relative"
      >
        <Listbox.Button className="grid grid-cols-[1fr_auto] items-center text-left gap-2 w-full @md:w-52 p-4 border border-gray-l3 dark:border-bluegray rounded">
          {({ open }) => (
            <>
              <span className="uppercase truncate @max-md:text-sm">
                {AVAILABLE_CHAINS.find(
                  (chain) => chain.chainId === selectedNetwork
                )?.name || "Unknown chain"}
              </span>
              <DrawerIcon
                isOpen={open}
                className="text-2xl text-gray-d1 dark:text-white"
                aria-hidden="true"
              />
            </>
          )}
        </Listbox.Button>

        <Listbox.Options className="absolute mt-1 z-10 flex flex-col gap-1 w-full p-1 border border-gray-l3 dark:border-bluegray rounded bg-white dark:bg-blue-d6 shadow-lg">
          <>
            {(isClosed ? EVM_CHAINS : AVAILABLE_CHAINS).map((chain) => (
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
    </div>
  );
}
