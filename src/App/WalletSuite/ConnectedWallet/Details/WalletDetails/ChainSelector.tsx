import { Listbox } from "@headlessui/react";
import { ConnectedWallet } from "contexts/Wallet";
import Icon, { DrawerIcon } from "components/Icon";
import { chains } from "constants/chainsV2";

const SELECTOR_STYLE =
  "flex justify-between items-center w-full p-4 pl-3 font-normal font-body text-sm";

export default function ChainSelector(props: ConnectedWallet) {
  if (props.type !== "evm") return null;

  const supportedChains = Object.entries(chains).map(([chainId]) => chainId);
  const chain = chains[props.chainId];

  return (
    <Listbox
      value={props.chainId}
      onChange={async (chainId: string) => await props.switchChain(chainId)}
      as="div"
      className="relative"
    >
      <Listbox.Button
        className={`${SELECTOR_STYLE} border border-gray-l2 dark:border-bluegray rounded`}
      >
        {({ open }) => (
          <>
            {chain.name}
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
