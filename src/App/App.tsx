import {
  Switch,
  Route,
  Redirect,
  useLocation,
  useRouteMatch,
} from "react-router-dom";
import Login from "pages/Login/Login";
import TCA from "pages/TCA/TCA";
import { app, site } from "../types/routes";
import AppFoot from "components/Footers/AppFoot";
import { WalletProvider } from "@terra-money/wallet-provider";
import { mainnet, walletConnectChainIds } from "./chains";
import Leaderboard from "pages/Leaderboard/Leaderboard";
import Withdraw from "pages/Withdraw/Withdraw";

const App = () => {
  //{match.path} is '/app'
  const { path } = useRouteMatch();
  const location = useLocation();

  return (
    <div className={`grid bg-gradient-to-b from-blue-accent to-black-blue`}>
      <WalletProvider
        defaultNetwork={mainnet}
        walletConnectChainIds={walletConnectChainIds}
      >
        <Switch>
          <Redirect from="/:url*(/+)" to={location.pathname.slice(0, -1)} />
          <Route path={`${path}/${app.login}`} component={Login} />
          <Route path={`${path}/${app.tca}`} component={TCA} />
          <Route
            path={`${path}/${app.withdraw}/:address`}
            component={Withdraw}
          />
          <Route path={`${path}${app.index}`} component={Leaderboard} />
          <Redirect from="*" to={site.home} />
        </Switch>
        <AppFoot />
      </WalletProvider>
    </div>
  );
};

export default App;
