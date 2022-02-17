import {
  useRouteMatch,
  useLocation,
  Switch,
  Redirect,
  Route,
} from "react-router-dom";
import { admin } from "../types/routes";
import { WalletProvider } from "@terra-money/wallet-provider";
import AppFoot from "components/AppFoot/AppFoot";
import DappHead from "components/DappHead/DappHead";
import { mainnet, walletConnectChainIds } from "../App/chains";
import IndexFund from "pages/Admin/IndexFund/IndexFund";
import Endowments from "pages/Admin/Endowments/Endowments";
import AllianceMembers from "pages/Admin/AllianceMembers/AllianceMembers";
import CharityApps from "pages/Admin/CharityApps/CharityApps";
import Authentication from "pages/Admin/Authentication/Authentication";

const Admin = () => {
  //{match.path} is '/admin'
  const { path } = useRouteMatch();
  const location = useLocation();

  return (
    <div className="grid bg-gradient-to-b from-blue-accent to-black-blue">
      <WalletProvider
        defaultNetwork={mainnet}
        walletConnectChainIds={walletConnectChainIds}
      >
        <div className="grid grid-rows-a1 place-items-start min-h-screen pt-2 pb-16">
          <DappHead />

          <div className="flex justify-center w-full">
            <Switch>
              <Redirect from="/:url*(/+)" to={location.pathname.slice(0, -1)} />
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
                component={AllianceMembers}
              />
              <Route
                path={`${path}/${admin.auth}`}
                component={Authentication}
              />
              <Route path={`${path}/${admin.index}`} component={IndexFund} />
              <Redirect from="*" to={`${path}/${admin.auth}`} />
            </Switch>
          </div>
        </div>
        <AppFoot />
      </WalletProvider>
    </div>
  );
};

export default Admin;
