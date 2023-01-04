import { Popover } from "@headlessui/react";
import { ConnectedWallet, isEVM } from "contexts/WalletContext";
import Icon from "components/Icon";
import { chains } from "constants/chainsV2";
import ChainSelector from "./Details/ChainSelector";

export default function SupportedNetworksMenu(wallet: ConnectedWallet) {
  return (
    <Popover className="relative">
      <Popover.Button className="text-sm bg-white py-2 px-3 rounded-md flex gap-2 items-center text-red">
        <Icon type="Warning" size={20} />
        <span>Unsupported network</span>
      </Popover.Button>

      <Popover.Panel className="absolute z-10 w-full bg-white dark:bg-blue-d7 border border-gray-l2 dark:border-bluegray mt-2 rounded-md px-3 py-2">
        <p className="text-sm font-bold text-blue uppercase mb-4">
          Supported networks
        </p>
        {(wallet.type === "evm" && <ChainSelector {...wallet} />) || (
          <>
            {/** show only chain with the same type, if type="evm" give ability to switch */}
            <ul className="list-disc my-4 pl-4">
              {Object.entries(chains)
                .filter(([, chain]) => chain.type === wallet.type)
                .map(([, chain]) => (
                  <li key={chain.name} className="text-sm p-0.5">
                    {chain.name}
                  </li>
                ))}
            </ul>
          </>
        )}
        <button
          className=" mt-4 uppercase text-sm disabled:text-gray font-extrabold hover:text-orange hover:dark:text-orange-l2 text-right w-full"
          onClick={wallet.disconnect}
          disabled={isEVM(wallet) && wallet.isSwitching}
        >
          Disconnect
        </button>
      </Popover.Panel>
    </Popover>
  );
}
