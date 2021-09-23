import { Route, Switch, useRouteMatch } from "react-router-dom";
import Registration from "./Registration";
import ContactDetails from "./ContactDetails";
import ConfirmEmail from "./ConfirmEmail";
import VerifiedEmail from "./VerifiedEmail";
import RegistrationStatus from "./RegistrationStatus";
import { registerRoutes } from "types/types";
import WalletCheck from "./connect-wallet/WalletCheck";
import ConnectWallet from "./connect-wallet/ConnectWallet";
import SelectWallet from "./connect-wallet/SelectWallet";
import StepsDocs from "./register-docs/Steps-docs";
import UpdateProfile from "./charity-profile/Update-profile";
import OtherWallets from "./connect-wallet/OtherWallets";
import SelfCustody from "./connect-wallet/Self-custody";

const Register = () => {
  let match = useRouteMatch();
  console.log("match url => ", match.url);
  return (
    <section className="container mx-auto my-auto flex-auto my-10 flex justify-center">
      <div className="relative sm:w-4/5 max-w-6xl p-10 mt-32 text-center text-white">
        <Switch>
          <Route
            exact
            path={`${match.url}/${registerRoutes.detail}`}
            component={ContactDetails}
          />
          <Route
            exact
            path={`${match.url}/${registerRoutes.confirm}`}
            component={ConfirmEmail}
          />
          <Route
            exact
            path={`${match.url}/${registerRoutes.verify}`}
            component={VerifiedEmail}
          />
          <Route
            exact
            path={`${match.url}/${registerRoutes.status}`}
            component={RegistrationStatus}
          />
          <Route
            exact
            path={`${match.url}/${registerRoutes.wallet_check}`}
            component={WalletCheck}
          />
          <Route
            exact
            path={`${match.url}/${registerRoutes.select_wallet}`}
            component={SelectWallet}
          />
          <Route
            exact
            path={`${match.url}/${registerRoutes.connect_wallet}`}
            component={ConnectWallet}
          />
          <Route
            exact
            path={`${match.url}/${registerRoutes.upload_docs}`}
            component={StepsDocs}
          />
          <Route
            exact
            path={`${match.url}/${registerRoutes.charity_profile}`}
            component={UpdateProfile}
          />
          <Route
            exact
            path={`${match.url}/${registerRoutes.others}`}
            component={OtherWallets}
          />
          <Route
            exact
            path={`${match.url}/${registerRoutes.self_custody}`}
            component={SelfCustody}
          />
          <Route exact path={`${match.url}/index`} component={Registration} />
        </Switch>
      </div>
    </section>
  );
};

export default Register;
