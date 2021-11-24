import { WalletProvider as TerraProvider } from "@terra-money/wallet-provider";
import { UseWalletProvider as EthProvider } from "use-wallet";
import { mainnet, walletConnectChainIds } from "./chains";
import AppFoot from "components/Footers/AppFoot";
import Waiter from "components/Waiter/Waiter";
import Nodal from "components/Nodal/Nodal";
import Views from "./Views";
import Phantom from "wallets/Phantom";
import Keplr from "wallets/Keplr";

export default function App() {
  //ethereum
  const eth_connectors = {
    torus: { chainId: 1 },
    //TODO: get proper url
    ledger: {
      chainId: 1,
      url: "https://mainnet.infura.io/v3/f7ca16d6c4704dee939ca7557896cf07",
    },
  };

  //TODO: refactor non-terra providers to redux
  return (
    <div
      className={`grid bg-gradient-to-b from-blue-accent to-black-blue relative`}
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
