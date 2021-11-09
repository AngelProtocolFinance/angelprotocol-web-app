import AppFoot from "components/Footers/AppFoot";
import { WalletProvider } from "@terra-money/wallet-provider";
import { mainnet, walletConnectChainIds } from "./chains";
import { UseWalletProvider } from "use-wallet";
import Waiter from "components/Waiter/Waiter";
import Nodal from "components/Nodal/Nodal";
import Views from "./Views";

export default function App() {
  return (
    <div
      className={`grid bg-gradient-to-b from-blue-accent to-black-blue relative`}
    >
      <WalletProvider
        defaultNetwork={mainnet}
        walletConnectChainIds={walletConnectChainIds}
      >
        <UseWalletProvider
          connectors={{
            torus: { chainId: 1 },
            //TODO: get proper url
            ledger: {
              chainId: 1,
              url: "https://mainnet.infura.io/v3/f7ca16d6c4704dee939ca7557896cf07",
            },
          }}
        >
          <Nodal classes="bg-black bg-opacity-50 fixed top-0 right-0 bottom-0 left-0 z-10 grid place-items-center">
            <Waiter />
            <Views />
          </Nodal>
          <AppFoot />
        </UseWalletProvider>
      </WalletProvider>
    </div>
  );
}
