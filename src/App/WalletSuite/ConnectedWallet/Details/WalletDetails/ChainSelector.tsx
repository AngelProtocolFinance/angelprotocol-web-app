import { Listbox } from "@headlessui/react";
import { ConnectedWallet, isEVM } from "contexts/WalletContext";
import Icon, { DrawerIcon } from "components/Icon";
import { chains } from "constants/chainsV2";

const SELECTOR_STYLE =
  "flex justify-between items-center w-full p-4 pl-3 font-normal font-body text-sm";

export default function ChainSelector(props: ConnectedWallet) {
  const supportedChains = Object.entries(chains).map(([chainId]) => chainId);
  const chain = chains[props.chainId];

  if (!isEVM(props))
    return (
      <p
        className={`${SELECTOR_STYLE} border border-gray-l2 dark:border-bluegray rounded`}
      >
        {chain.name}
      </p>
    );

  return (
    <Listbox
      disabled={props.isSwitching}
      value={props.chainId}
      onChange={async (chainId: string) => await props.switchChain(chainId)}
      as="div"
      className="relative"
    >
      <Listbox.Button
        className={`${SELECTOR_STYLE} border border-gray-l2 dark:border-bluegray disabled:bg-gray-l2 dark:disabled:bg-bluegray-d1 rounded`}
      >
        {({ open }) => (
          <>
            {props.isSwitching ? "Switching..." : chain.name}
            <DrawerIcon
              isOpen={open}
              className="text-2xl text-gray-d1 dark:text-gray"
              aria-hidden="true"
            />
          </>
        )}
      </Listbox.Button>
      <Listbox.Options className="absolute mt-1 max-h-60 w-full overflow-y-auto flex flex-col border border-gray-l2 dark:border-bluegray rounded bg-white dark:bg-blue-d6 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
        {supportedChains.map((id) => (
          <Option key={id} id={id} />
        ))}
      </Listbox.Options>
    </Listbox>
  );
}

function Option({ id }: { id: string }) {
  const chain = chains[id];
  return (
    <Listbox.Option value={id}>
      {({ active, selected }) => (
        <span
          className={`${SELECTOR_STYLE} ${
            active ? "bg-orange-l5 dark:bg-blue-d3" : ""
          } cursor-pointer`}
        >
          {chain.name}
          {selected && (
            <Icon
              type="Check"
              className="text-2xl text-gray-d1 dark:text-gray"
            />
          )}
        </span>
      )}
    </Listbox.Option>
  );
}
