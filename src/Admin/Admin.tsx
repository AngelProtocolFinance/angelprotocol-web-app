import {
  Switch,
  Route,
  Redirect,
  useLocation,
  useRouteMatch,
} from "react-router-dom";
import { admin } from "../types/routes";
import AppFoot from "components/Footers/AppFoot";
import { WalletProvider } from "@terra-money/wallet-provider";
import { mainnet, walletConnectChainIds } from "../App/chains";
import { UseWalletProvider } from "use-wallet";
import Nodal from "components/Nodal/Nodal";
import { useGetAuthorized } from "contexts/AuthProvider";

const Admin = () => {
  //{match.path} is '/admin'
  const { path } = useRouteMatch();
  const location = useLocation();
  const auth = useGetAuthorized();

  return (
    <div className={`grid bg-gradient-to-b from-blue-accent to-black-blue`}>
      <WalletProvider
        defaultNetwork={mainnet}
        walletConnectChainIds={walletConnectChainIds}
      >
        <UseWalletProvider
          connectors={{
            torus: { chainId: 1 },
            ledger: {
              chainId: 1,
              url: "https://mainnet.infura.io/v3/f7ca16d6c4704dee939ca7557896cf07",
            },
          }}
        >
          <Nodal classes="bg-black bg-opacity-50 fixed top-0 right-0 bottom-0 left-0 z-10 grid place-items-center">
            <Views />
            <AppFoot />
          </Nodal>
        </UseWalletProvider>
      </WalletProvider>
    </div>
  );
};

export default Admin;
