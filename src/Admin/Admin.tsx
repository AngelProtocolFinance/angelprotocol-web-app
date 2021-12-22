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
import IndexFund from "pages/Admin/IndexFund/IndexFund";
import AdminLogin from "pages/Admin/Login/AdminLogin";
import Authentication from "pages/Admin/Authentication/Authentication";
import CharityApps from "pages/Admin/CharityApps/CharityApps";
import DappHead from "components/Headers/DappHead";
import Endowments from "pages/Admin/Endowments/Endowments";
import Nodal from "components/Nodal/Nodal";
import { useGetToken, useGetAuthorized } from "contexts/AuthProvider";

const Admin = () => {
  //{match.path} is '/admin'
  const { path } = useRouteMatch();
  const location = useLocation();
  const decodedToken = useGetToken();
  const authorized = useGetAuthorized();

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
            <div className="grid grid-rows-a1 place-items-start min-h-screen pt-2 pb-16">
              <DappHead />
              <div className="flex justify-center w-full">
                {!decodedToken?.apToken ? (
                  <AdminLogin />
                ) : !authorized.isAuthorized ? (
                  <Authentication />
                ) : (
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
                      component={Endowments}
                    />
                    <Route
                      path={`${path}/${admin.alliance_members}`}
                      component={IndexFund}
                    />
                    <Route
                      path={`${path}/${admin.authentication}`}
                      component={Authentication}
                    />
                    <Route
                      path={`${path}/${admin.login}`}
                      component={AdminLogin}
                    />
                    <Redirect from="*" to={`${path}/${admin.login}`} />
                  </Switch>
                )}
              </div>
            </div>
            <AppFoot />
          </Nodal>
        </UseWalletProvider>
      </WalletProvider>
    </div>
  );
};

export default Admin;
