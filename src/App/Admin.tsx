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
import AppHead from "components/Headers/AppHead";
import AdminSideNav from "pages/Admin/AdminSideNav";

const Admin = () => {
  //{match.path} is '/app'
  const { path } = useRouteMatch();
  const location = useLocation();

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
          <div className="grid grid-rows-a1 place-items-start min-h-screen pt-2 pb-16">
            <AppHead />
            <div className="flex md:grid-cols-2 justify-start w-full md:mx-auto md:container bg-gray-400 min-h-3/4 gap-0 mt-10">
              <AdminSideNav />
              <Switch>
                <Redirect
                  from="/:url*(/+)"
                  to={location.pathname.slice(0, -1)}
                />
                <Route
                  path={`${path}/${admin.index_fund_management}`}
                  component={IndexFund}
                />
                <Route
                  path={`${path}/${admin.charity_applications}`}
                  component={IndexFund}
                />
                <Route
                  path={`${path}/${admin.endowments}`}
                  component={IndexFund}
                />
                <Route
                  path={`${path}/${admin.aliance_members}`}
                  component={IndexFund}
                />
                <Route path={`${path}${admin.index}`} component={IndexFund} />
                <Redirect from="*" to={site.home} />
              </Switch>
            </div>
          </div>
          <AppFoot />
        </UseWalletProvider>
      </WalletProvider>
    </div>
  );
};

export default Admin;
