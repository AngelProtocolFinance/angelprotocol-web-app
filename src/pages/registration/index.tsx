import { Route, Switch, useRouteMatch } from "react-router-dom";
import Registration from "./Registration";
import ContactDetails from "./ContactDetails";
import ConfirmEmail from "./ConfirmEmail";
import VerifiedEmail from "./VerifiedEmail";
import RegistrationStatus from "./RegistrationStatus";
import WalletCheck from "./connect-wallet/WalletCheck";
import ConnectWallet from "./connect-wallet/ConnectWallet";
import SelectWallet from "./connect-wallet/SelectWallet";
import StepsDocs from "./register-docs/Steps-docs";
import UpdateProfile from "./charity-profile/Update-profile";
import OtherWallets from "./connect-wallet/OtherWallets";
import SelfCustody from "./connect-wallet/Self-custody";
import { register } from "types/routes";
import AppHead from "components/Headers/AppHead";
const Register = () => {
  //this component will only render under '/app/register/'
  const { path } = useRouteMatch();
  return (
    <section className="grid grid-rows-dashboard pb-16 justify-items-center">
      <AppHead />
      <div className="relative sm:w-4/5 max-w-6xl p-10 mt-5 text-center text-white">
        <Switch>
          <Route
            exact
            path={`${path}/${register.detail}`}
            component={ContactDetails}
          />
          <Route
            exact
            path={`${path}/${register.confirm}`}
            component={ConfirmEmail}
          />
          <Route
            exact
            path={`${path}/${register.verify}`}
            component={VerifiedEmail}
          />
          <Route
            exact
            path={`${path}/${register.status}`}
            component={RegistrationStatus}
          />
          <Route
            exact
            path={`${path}/${register.wallet_check}`}
            component={WalletCheck}
          />
          <Route
            exact
            path={`${path}/${register.select_wallet}`}
            component={SelectWallet}
          />
          <Route
            exact
            path={`${path}/${register.connect_wallet}`}
            component={ConnectWallet}
          />
          <Route
            exact
            path={`${path}/${register.upload_docs}`}
            component={StepsDocs}
          />
          <Route
            exact
            path={`${path}/${register.charity_profile}`}
            component={UpdateProfile}
          />
          <Route
            exact
            path={`${path}/${register.others}`}
            component={OtherWallets}
          />
          <Route
            exact
            path={`${path}/${register.self_custody}`}
            component={SelfCustody}
          />
          <Route
            exact
            path={`${path}${register.index}`}
            component={Registration}
          />
        </Switch>
      </div>
    </section>
  );
};

export default Register;
