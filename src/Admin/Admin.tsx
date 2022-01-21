import {
  useRouteMatch,
  useLocation,
  Switch,
  Redirect,
  Route,
} from "react-router-dom";
import { WalletProvider } from "@terra-money/wallet-provider";
import { lazy, Suspense } from "react";
import AppFoot from "components/Footers/AppFoot";
import Loader from "components/Loader/Loader";
import DappHead from "components/Headers/DappHead";
import { mainnet, walletConnectChainIds } from "../App/chains";
import IndexFund from "pages/Admin/IndexFund/IndexFund";
import { admin } from "types/routes";

const Authentication = lazy(
  () => import("pages/Admin/Authentication/Authentication")
);
const CharityApps = lazy(() => import("pages/Admin/CharityApps/CharityApps"));

const Admin = () => {
  //{match.path} is '/admin'
  const { path } = useRouteMatch();
  const location = useLocation();

  const LoaderComponent = () => (
    <Loader bgColorClass="bg-white" gapClass="gap-2" widthClass="w-4" />
  );

  return (
    <div className="grid bg-gradient-to-b from-blue-accent to-black-blue">
      <WalletProvider
        defaultNetwork={mainnet}
        walletConnectChainIds={walletConnectChainIds}
      >
        <div className="grid grid-rows-a1 place-items-start min-h-screen pt-2 pb-16">
          <DappHead />
          <Suspense fallback={<LoaderComponent />}>
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
                <Route
                  path={`${path}/${admin.auth}`}
                  component={Authentication}
                />
                <Route path={`${path}/${admin.index}`} component={IndexFund} />
                <Redirect from="*" to={`${path}/${admin.auth}`} />
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
