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
import { chains } from "contracts/types";

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
  torus: { chainId: +chains.eth_main },
  walletconnect: {
    rpc: {
      [chains.eth_main]:
        "https://mainnet.infura.io/v3/f7ca16d6c4704dee939ca7557896cf07",
      [chains.eth_ropsten]:
        "https://ropsten.infura.io/v3/f7ca16d6c4704dee939ca7557896cf07",
      [chains.eth_kovan]:
        "https://kovan.infura.io/v3/f7ca16d6c4704dee939ca7557896cf07",
    },
    qrcode: false,
  },
  //TODO: get proper url
  ledger: {
    chainId: +chains.eth_main,
    url: "https://mainnet.infura.io/v3/f7ca16d6c4704dee939ca7557896cf07",
  },
};
