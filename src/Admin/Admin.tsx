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
import CharityApps from "pages/Admin/CharityApps/CharityApps";
import AllianceMembers from "pages/Admin/AllianceMembers/AllianceMembers";
import DappHead from "components/Headers/DappHead";

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
        <UseWalletProvider
          connectors={{
            torus: { chainId: 1 },
            ledger: {
              chainId: 1,
              url: "https://mainnet.infura.io/v3/f7ca16d6c4704dee939ca7557896cf07",
            },
          }}
        >
          <div className="grid grid-rows-a1 place-items-start min-h-screen pt-2 pb-16">
            <DappHead />
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
                  component={AllianceMembers}
                />
                <Route path={`${path}/${admin.login}`} component={AdminLogin} />
                <Route path={`${path}/${admin.index}`} component={IndexFund} />
                <Redirect from="*" to={`${path}/${admin.login}`} />
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
