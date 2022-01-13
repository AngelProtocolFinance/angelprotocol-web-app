import { WalletProvider as TerraProvider } from "@terra-money/wallet-provider";
import {} from "@web3-react/torus-connector";
import { UseWalletProvider as EthProvider } from "use-wallet";
import { mainnet, walletConnectChainIds } from "./chains";
import AppFoot from "components/Footers/AppFoot";
import Waiter from "components/Waiter/Waiter";
import Nodal from "components/Nodal/Nodal";
import Views from "./Views";
import Phantom from "wallets/Phantom";
import Keplr from "wallets/Keplr";
import { chainIDs } from "contracts/types";
import { eth_rpcs } from "constants/urls";
import DappHead from "components/Headers/DappHead";

export default function App() {
  //TODO: refactor non-terra providers to redux
  return (
    <div
      className={`grid content-between bg-gradient-to-b from-blue-accent to-black-blue relative`}
    >
      <TerraProvider
        defaultNetwork={mainnet}
        walletConnectChainIds={walletConnectChainIds}
      >
        <EthProvider connectors={eth_connectors}>
          <DappHead />
          <Phantom>
            <Keplr>
              <Nodal classes="bg-black bg-opacity-50 fixed top-0 right-0 bottom-0 left-0 z-10 grid place-items-center">
                <Waiter />
                <Views />
              </Nodal>
            </Keplr>
          </Phantom>
          <AppFoot />
        </EthProvider>
      </TerraProvider>
    </div>
  );
}

//ethereum
const eth_connectors = {
  torus: { chainId: +chainIDs.eth_main },
  walletconnect: {
    rpc: {
      [chainIDs.eth_main]: eth_rpcs[chainIDs.eth_main],
      [chainIDs.eth_ropsten]: eth_rpcs[chainIDs.eth_ropsten],
      [chainIDs.eth_kovan]: eth_rpcs[chainIDs.eth_kovan],
    },
    qrcode: false,
  },
  ledger: {
    chainId: +chainIDs.eth_main,
    url: eth_rpcs[chainIDs.eth_main],
  },
};
