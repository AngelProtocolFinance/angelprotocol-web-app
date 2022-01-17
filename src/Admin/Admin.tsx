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
import IndexFund from "pages/Admin/IndexFund/IndexFund";
import DappHead from "components/Headers/DappHead";
import { lazy, Suspense } from "react";
import Loader from "components/Loader/Loader";

const AdminLogin = lazy(() => import("pages/Admin/Login/AdminLogin"));
const CharityApps = lazy(() => import("pages/Admin/CharityApps/CharityApps"));

const Admin = () => {
  //{match.path} is '/admin'
  const { path } = useRouteMatch();
  const location = useLocation();

  return (
    <div className={`grid bg-gradient-to-b from-blue-accent to-black-blue`}>
      <WalletProvider
        defaultNetwork={mainnet}
        walletConnectChainIds={walletConnectChainIds}
      >
        <div className="grid grid-rows-a1 place-items-start min-h-screen pt-2 pb-16">
          <DappHead />
          <Suspense
            fallback={
              <Loader
                bgColorClass="bg-white"
                gapClass="gap-2"
                widthClass="w-4"
              />
            }
          >
            <div className="flex justify-center w-full">
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
                  component={CharityApps}
                />
                <Route
                  path={`${path}/${admin.endowments}`}
                  component={IndexFund}
                />
                <Route
                  path={`${path}/${admin.alliance_members}`}
                  component={IndexFund}
                />
                <Route path={`${path}/${admin.login}`} component={AdminLogin} />
                <Route path={`${path}/${admin.index}`} component={IndexFund} />
                <Redirect from="*" to={`${path}/${admin.login}`} />
              </Switch>
            </div>
          </Suspense>
        </div>
        <AppFoot />
      </WalletProvider>
    </div>
  );
};

export default Admin;
