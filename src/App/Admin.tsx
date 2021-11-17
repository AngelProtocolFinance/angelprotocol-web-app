import {
  Switch,
  Route,
  Redirect,
  useLocation,
  useRouteMatch,
} from "react-router-dom";
import { admin, site } from "../types/routes";
import AppFoot from "components/Footers/AppFoot";
import { WalletProvider } from "@terra-money/wallet-provider";
import { mainnet, walletConnectChainIds } from "./chains";
import { UseWalletProvider } from "use-wallet";
import IndexFund from "pages/Admin/IndexFund/IndexFund";

const Admin = () => {
  //{match.path} is '/app'
  const { path } = useRouteMatch();
  const location = useLocation();
  console.log("path", path);
  return (
    <div className={`grid bg-gradient-to-b from-blue-accent to-black-blue`}>
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
          <Switch>
            <Redirect from="/:url*(/+)" to={location.pathname.slice(0, -1)} />
            <Route
              path={`${path}/${admin.index_fund_management}`}
              component={IndexFund}
            />
            <Redirect from="*" to={site.home} />
          </Switch>
          <AppFoot />
        </UseWalletProvider>
      </WalletProvider>
    </div>
  );
};

export default Admin;
