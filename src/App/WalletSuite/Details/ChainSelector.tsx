import { Listbox } from "@headlessui/react";
import { EVMWallet } from "contexts/WalletContext";
import Icon, { DrawerIcon } from "components/Icon";
import { chains } from "constants/chains";

const SELECTOR_STYLE =
  "flex justify-between items-center w-full p-4 pl-3 text-sm";

type TOption = { name: string; id: string };
const options: TOption[] = Object.entries(chains)
  .filter(([, chain]) => chain.type === "evm")
  .map(([id, chain]) => ({ id, name: chain.name }));

export default function ChainSelector(props: EVMWallet) {
  /** if unsupported, no recort in chains */
  const currChain = chains[props.chainId]?.name || "Select network";

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
            {props.isSwitching ? "Switching..." : currChain}
            <DrawerIcon
              isOpen={open}
              className="text-2xl text-gray-d1 dark:text-gray"
              aria-hidden="true"
            />
          </>
        )}
      </Listbox.Button>
      <Listbox.Options className="absolute mt-1 max-h-60 w-full overflow-y-auto flex flex-col border border-gray-l2 dark:border-bluegray rounded bg-white dark:bg-blue-d6 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
        {options.map((o) => (
          <Option key={o.id} {...o} />
        ))}
      </Listbox.Options>
    </Listbox>
  );
}

function Option({ id, name }: TOption) {
  return (
    <Listbox.Option value={id}>
      {({ active, selected }) => (
        <span
          className={`${SELECTOR_STYLE} ${
            active ? "bg-orange-l5 dark:bg-blue-d3" : ""
          } cursor-pointer`}
        >
          {name}
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
