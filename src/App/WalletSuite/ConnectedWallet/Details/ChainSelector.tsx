import { Listbox } from "@headlessui/react";
import { BaseChain } from "types/aws";
import { useErrorContext } from "contexts/ErrorContext";
import { WalletState, useSetWallet } from "contexts/WalletContext";
import Icon, { DrawerIcon } from "components/Icon";
import { chainIDs } from "constants/chains";

const SELECTOR_STYLE =
  "flex justify-between items-center w-full p-4 pl-3 font-normal font-body text-sm";

export default function ChainSelector(props: WalletState) {
  const { handleError } = useErrorContext();

  const { switchChain } = useSetWallet();

  const handleSwitch = async (chainId: chainIDs) => {
    try {
      await switchChain(chainId);
    } catch (e) {
      handleError(e);
    }
  };

  return (
    <Listbox
      value={props.chain.chain_id}
      onChange={handleSwitch}
      as="div"
      className="relative"
    >
      <Listbox.Button
        className={`${SELECTOR_STYLE} border border-prim rounded`}
      >
        {({ open }) => (
          <>
            {props.chain.chain_name}
            <DrawerIcon
              isOpen={open}
              className="text-2xl text-gray-d1 dark:text-gray"
              aria-hidden="true"
            />
          </>
        )}
      </Listbox.Button>
      <Listbox.Options className="absolute mt-1 max-h-60 w-full overflow-y-auto flex flex-col border border-prim rounded bg-white dark:bg-blue-d6 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
        {props.supportedChains.map((suppChain) => (
          <Option key={suppChain.chain_id} {...suppChain} />
        ))}
      </Listbox.Options>
    </Listbox>
  );
}

function Option({ chain_id, chain_name }: BaseChain) {
  return (
    <Listbox.Option value={chain_id}>
      {({ active, selected }) => (
        <span
          className={`${SELECTOR_STYLE} ${
            active ? "bg-orange-l5 dark:bg-blue-d3" : ""
          } cursor-pointer`}
        >
          {chain_name}
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
